import { prisma } from "@/lib/prisma";
import { parse } from "path";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const facturaId = parseInt(id);

    if (isNaN(facturaId)) {
      return Response.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await req.json();
    const { clienteId, productos } = body;

    if (!clienteId || !productos || productos.length === 0) {
      return Response.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    //  RECALCULAR TODO
    const subtotal = productos.reduce((acc: number, item: any) => {
      const sub = item.cantidad * item.precio;
      item.subtotal = sub;
      return acc + sub;
    }, 0);

    const iva = parseFloat((subtotal * 0.16).toFixed(2));
    const total = parseFloat((subtotal + iva).toFixed(2));

    const factura = await prisma.factura.update({
      where: { id: facturaId },
      data: {
        clienteId,
        productos,
        subtotal,
        iva,
        total,
      },
    });

    return Response.json(factura);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error al actualizar la factura" },
      { status: 500 }
    );
  }
}
// Eliminar factura
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const facturaId = parseInt(id);

    await prisma.factura.delete({
        where: { id: facturaId }
    });

    return Response.json({ message: "Factura eliminada" });
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const facturaId = parseInt(id);

    // Validación
    if (isNaN(facturaId)) {
        return Response.json(
            { error: "ID inválido" },
            { status: 400 }
        );
    }

    const factura = await prisma.factura.findUnique({
        where: { id: facturaId },
    });

    if (!factura) {
        return Response.json(
            { error: "Factura no encontrada" },
            { status: 404 }
        );
    }

    return Response.json(factura);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const facturaId = parseInt(id);

    if (isNaN(facturaId)) {
      return Response.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { clienteId, productos } = body;

    const data: any = {};

    // 🧍 Actualizar cliente (si viene)
    if (clienteId !== undefined) {
      data.clienteId = clienteId;
    }

    // 📦 Si vienen productos → recalcular TODO
    if (productos !== undefined) {
      const subtotal = productos.reduce((acc: number, item: any) => {
        const sub = item.cantidad * item.precio;
        item.subtotal = sub;
        return acc + sub;
      }, 0);

      const iva = parseFloat((subtotal * 0.16).toFixed(2));
      const total = parseFloat((subtotal + iva).toFixed(2));

      data.productos = productos;
      data.subtotal = subtotal;
      data.iva = iva;
      data.total = total;
    }

    // ⚠️ Validar que sí haya algo que actualizar
    if (Object.keys(data).length === 0) {
      return Response.json(
        { error: "No hay datos para actualizar" },
        { status: 400 }
      );
    }

    const factura = await prisma.factura.update({
      where: { id: facturaId },
      data,
    });

    return Response.json(factura);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error al actualizar la factura" },
      { status: 500 }
    );
  }
}