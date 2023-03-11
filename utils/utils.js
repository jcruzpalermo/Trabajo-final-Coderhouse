import bcrypt from "bcrypt";

const createHash = password => {
    return bcrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const isValidPassword = (userPassword, password) => {
    return bcrypt.compareSync(password, userPassword);
};

export {
    createHash,
    isValidPassword
}