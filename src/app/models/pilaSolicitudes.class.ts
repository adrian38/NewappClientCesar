export class PilaSolicitudes <T>{
    private vec:T[]=[];

  insertar(x: T) {
      this.vec.push(x);
  }

  extraer() {
     if (this.vec.length>0){
     let temp = this.vec;
     this.vec = [];
       return temp;
    }
     else
       return null; 
  }

  empthy(){
    if (this.vec.length>0)
      return false;
      else
        return true;
  }

}
