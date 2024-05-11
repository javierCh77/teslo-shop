
//examples
//todo [1,2,3,4,5,...,50]


export const generatePaginationNumbers =  ( currentPage:number, totalPages:number) =>{
    
    //si el numero total de pagina es menor q 7 o menos
    if(totalPages <= 7){
        return Array.from({ length: totalPages}, (_,i) => i + 1);
    }    
    // si la pagina esta entre las primeras 3 paginas 
    if(currentPage <= 3){
        return [1,2,3,'...', totalPages -1, totalPages];
    }
    
    // si la pagina actual esta entre las ultimas 3 paginas 
    if( currentPage >=-2){
        return [1,2,'...', totalPages -2, totalPages -1 , totalPages] ;
    }
    
    // Si la pagina actual esta en otro lugar medio mostrar la pagina 
    return [1,'...',currentPage -1, currentPage, currentPage + 1, '...', totalPages];
     
}