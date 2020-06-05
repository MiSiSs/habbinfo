export const HOST = 'https://www.habbo.es/api/public/';

export const IMG_NAME_BANEADO = "https://www.habbo.es/habbo-imaging/avatarimage?direction=4&head_direction=3&action=wav&gesture=sml&size=m&user=Sr.Guitarron";

export function IMG_NAME(figureString: string){
    return "https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure="+figureString+"&direction=2&head_direction=2";
}

export function IMG_BADGES(placa: string){
    return "https://habboo-a.akamaihd.net/c_images/album1584/"+placa+".png";
}