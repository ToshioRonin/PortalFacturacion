import { prisma } from "@/lib/prisma";

// Obtener todas las facturas
export async function GET() {
  const facturas = await prisma.factura.findMany();
  return Response.json(facturas);
}

// Crear factura
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clienteId, productos } = body;

    // 🔒 Validaciones básicas
    if (!clienteId || !productos || productos.length === 0) {
      return Response.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    //  Calcular subtotal por producto y total general
    const subtotal = productos.reduce((acc: number, item: any) => {
      const sub = item.cantidad * item.precio;
      item.subtotal = sub; // guardamos subtotal en cada producto
      return acc + sub;
    }, 0);

    // 🇲🇽 IVA 16%
    const iva = subtotal * 0.16;

    // Total final
    const total = subtotal + iva;

    // Guardar en BD
    const factura = await prisma.factura.create({
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
      { error: "Error al crear la factura" },
      { status: 500 }
    );
  }
}