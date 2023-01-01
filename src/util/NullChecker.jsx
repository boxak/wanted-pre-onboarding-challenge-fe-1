class NullChecker {
    fixNullString = (str) => {
        if (str === undefined || str === null) {
            return "";
        }

        return str;
    }

    isEmpty = (str) => {
        return (str === undefined || str === null || str.length === 0);
    }

    fixEmptyObj = (obj) => {
        if (obj === undefined || obj === null) {
            return {};
        }

        return obj;
    }
}

export default new NullChecker();