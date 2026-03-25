import { prisma } from "@/lib/prisma";
import { parse } from "path";

//Actualizar factura
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const facturaId = parseInt(id);

    const body = await req.json();
    const { clienteId, productos } = body;

    const total = productos.reduce((acc: number, item: any) => {
        return acc + (item.cantidad * item.precio);
    }, 0);

    const factura = await prisma.factura.update({
        where: { id: facturaId },
        data: {
            clienteId,
            productos,
            total
        }
    });

    return Response.json(factura);
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

    // Objeto dinámico (solo lo que venga)
    const data: any = {};

    if (clienteId !== undefined) {
        data.clienteId = clienteId;
    }

    if (productos !== undefined) {
        data.productos = productos;

        // recalcular total SOLO si cambian productos
        const total = productos.reduce((acc: number, item: any) => {
            return acc + item.cantidad * item.precio;
        }, 0);

        data.total = total;
    }

    const factura = await prisma.factura.update({
        where: { id: facturaId },
        data,
    });

    return Response.json(factura);
}