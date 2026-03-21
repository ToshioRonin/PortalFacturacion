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