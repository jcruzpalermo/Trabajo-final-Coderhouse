const homeController = (req, res) => {
    return res.render(`index`);
}

const signupController = (req, res) => {
    return res.render(`signup`);
}

const bienvenidaController = (req, res) => {
    userLog = req.user;
    return res.render(`bienvenida`, { userLog });
}

const viewFormAddProductController = (req, res) => {
    return res.render(`formProductosAdmin`);
}

const viewDataServerController = (req, res) => {
    const data = {
        directorioActual: process.cwd(),
        idProceso: process.pid,
        vNode: process.version,
        rutaEjecutable: process.execPath,
        sistemaOperativo: process.platform,
        memoria: JSON.stringify(process.memoryUsage().rss, null, 2),
    }
    return res.render('serverData', data);
}

const sobreNosotrosController = (req,res) =>{
    return res.render(`sobreNosotros`);
}

const viewErrorController = (req, res) => {
    msgError = req.params.msg;
    return res.render(`viewError`);
}

export {
    homeController,
    signupController,
    bienvenidaController,
    viewFormAddProductController,
    viewDataServerController,
    sobreNosotrosController,
    viewErrorController
}