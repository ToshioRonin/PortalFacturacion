import { prisma } from "@/lib/prisma";

// Obtener todas las facturas
export async function GET() {
    const facturas = await prisma.factura.findMany();
    return Response.json(facturas);
}

// Crear factura
export async function POST(req: Request) {
    const body = await req.json();

    const { clienteId, productos } = body;

    // calcular total
    const total = productos.reduce((acc: number, item: any) => {
        return acc + (item.cantidad * item.precio);
    }, 0);

    const factura = await prisma.factura.create({
        data: {
            clienteId,
            productos,
            total
        }
    });

    return Response.json(factura);
}