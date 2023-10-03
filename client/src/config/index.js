export const PRODUCT_MODE = true;
export const SERVER_URL = PRODUCT_MODE ? "" : "http://localhost:5000"
export const STATIC_PREFIX = PRODUCT_MODE ? "/chat":""