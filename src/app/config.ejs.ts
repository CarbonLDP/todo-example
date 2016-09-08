export const DEBUG:boolean = "<%- app.debug %>".toLowerCase() === "true";
export const SERVICES:"carbon" | "stubbed" = <any>"<%- app.services %>";

export const URL_BASE:string = "<%- url.base %>";
export const CARBON_DOMAIN:string = "<%- carbon.domain %>";
export const CARBON_HTTPS:boolean = "<%- carbon.https %>".toLowerCase() === "true";
