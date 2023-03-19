import storage from "../../daos/DAOFactory.js";
const ordenesStorage = storage().ordenes;

import sendMail from "../../utils/nodemailerGmail.js";
import sendSMS from "../../utils/twilioSMS.js";
import sendWhatsApp from "../../utils/twilioWhatsApp.js";

const createOrdenController = async (req, res) => {
    try {
        const userLog = req.user;
        const userID = req.body.idUser;
        const orden = await ordenesStorage.createOrden(userID);

        auxEmail(userLog, orden);
        /*
            NOTA:
                -La función encargada de realizar el envío de SMS se encuentra comentada ya que genera gastos.
                -La función encargada de realizar el envío de whatsapp se encuentra comentada ya que genera gastos.
        */
        //sendSMS(`Su pedido ha sido recibido y se encuentra en proceso`, `+14057251618`, `+59894057052`);
        //auxWhatsApp(userLog, orden);

        return res.render(`compraFinalizada`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al crear el la orden ${err}`
        });
    }
};

const viewOrdenesController = async (req, res) => {
    try {
        let allOrdenes = await ordenesStorage.getAll();

        //Normalizo los datos:
        //const allProductsDTO = allProducts.map(product => new ProductoDTO(product));

        return res.status(200).send({
            success: true,
            ordenes: allOrdenes
        });

    } catch (err) {
        return res.status(404).send({
            success: false,
            message: `Error al obtener las ordenes`
        });
    }
};

const auxEmail = async (userLog, orden) => {
    let detallePedido = ``;

    orden.products.forEach(element => {
        detallePedido += `
        <li>UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo} </li>
    `;
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: `jcruzpalermo@gmail.com`,
        subject: `Nuevo pedido de: ${userLog.username}`,
        html: `
            <h3>Nuevo pedido!</h3>
            <p> Datos del cliente:</p>
            <ul>
            <li> Nombre: ${userLog.username}</li>
            <li> Email: ${userLog.email}</li>
            <li> Teléfono: ${userLog.telefono}</li>
            <li> Direccion: ${userLog.direccion}</li>
            </ul>
            <p> Pedido:</p>
            <ul>
            ${detallePedido}
            </ul>
        `
    };
    const email = await sendEmail(mailOptions);
}

const auxWhatsApp = async (userLog, orden) => {
    let detallePedido = ``;

    orden.products.forEach(element => {
        detallePedido +=
            `
            - UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo}
            `;
    });

    const body =
        `Nuevo pedido!
        Datos del cliente:
        Nombre: ${userLog.username}
        ${userLog.email}
        Teléfono: ${userLog.telefono}
        Direccion: ${userLog.direccion}
        Pedido:
        ${detallePedido}
        `;
    await sendWhatsApp(body, `whatsapp:+12345678`, `whatsapp:+45697828`);
}

export { viewOrdenesController,
    createOrdenController, };