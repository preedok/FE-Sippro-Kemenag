const getRolePath = (role) => {
    switch (role) {
        case "User":
        case 1:
            return "/ptki";
        case "AsesorInstitusi":
            return "/asesor/beranda";
        case "BanPT":
        case 7:
            return "/banpt";
        case "Lamdik":
        case 9:
            return "/lamdik";
        case "Lamemba":
        case 10:
            return "/lamemba";
        case "Ptsp":
        case 11:
            return "/ptsp";
        case "DirekturJendral":
        case 0:
            return "/direktur";
        case "Kasubdit":
        case 4:
        case 5:
            return "/kasubdit";
        case "Biro":
        case 8:
            return "/birohukum";
        case "Bendahara":
        case 52:
            return "/kasubdit";
        case "AdminValidator":
        // case 0:
            return "/admin-validator";
        case "AdminValidatorLamdik":
        // case 1:
            return "/admin-validator-lamdik";
        case "AdminValidatorLamemba":
        case 2:
            return "/admin-validator-lamemba";
        case "AdminValidatorBanpt":
        case 3:
            return "/admin-validator-banpt";
        case "ValidatorLamdik":
        case 11:
            return "/validator-lamdik/beranda";
        case "ValidatorLamemba":
        case 12:
            return "/validator-lamemba/beranda";
        case "ValidatorBanpt":
        case 13:
            return "/validator-banpt/beranda";
        default:
            return "/kasubdit";
    }
};

export default getRolePath;
