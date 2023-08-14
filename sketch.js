let h=100; // Ancho y alto del altavoz.
let hm=200;// Altura del micrófono.
let x=67;  // Posición del micrófono.
let lw;    // Caja Dato Nivel de potencia de la fuente.
let LW=0;    // Dato Nivel de potencia
let D=0;   // Distancia máxima del micrófono
let r, dis // Distancia de la fuente al mic
let NPS=0; // Nivel de presión sonora.    
let q;     // Caja Factor de Directividad
let Q;     // Factor de directividad
let N=1    // Número de fuentes
let AUX=true;   // Variable auxiliar


// Pre cargar los archivos de fotos.
function preload(){
  altavoz=loadImage("Altavoz.png"); //Carga imágen
  microfono=loadImage("Micrófono-atril.png"); //Carga imágen
  instrucciones=loadStrings("Instrucciones.txt"); //Archivo texto de ayuda
  
}

function setup() {
  createCanvas(800, 600);
  
  // Caja de ingreso de Nivel de potencia.
    lw = createInput('0','number');
    lw.position(60,25);
    lw.size(50,20);
  
    dis = createInput('0','number');
    dis.position(60,55);
    dis.size(50,20);
  
    q = createInput('1','number');
    q.position(250,55);
    q.size(50,20);
  
    n = createInput('1','number');
    n.position(250,25);
    n.size(50,20);
    
//Botón de Ayuda
  B1=createButton('Ayuda');
  //B1=createButton('⚙️')
  B1.position(700, 20);
  B1.mousePressed(Click1);
  
  
}

function draw() {
  background(135, 206, 250); // Cielo
  fill(34, 139, 34);
//  rect(0,3*height/4,width,height); // Pästo
  rect(0,530,width,height); // Pästo
    
 
////////
// CAJA DE INGRESO DE DATOS
///////
  push()
  textSize(20)
  fill(0)
  text("Lw=",20, 45);
  text("[dB]",120, 45);
  text("D=",30, 75);
  text("[m]",120, 75);
  text("Q=",220, 75);
  text("N=",220, 45);
  
  text("D="+D+"[m]",680, 550); // Distancia Máxima
  text(D/2+"[m]",366, 550);  // MItad de la distancia
  pop()
  
  
  //l = dist(65, 0, mouseX, 0);//distancia entre el altavoz y la fuente.
  LW=lw.value(); //Nivel de potencia de la fuente.
  D=dis.value(); // Distancia máxima donde estará el micrófono.
  /// LIMITE INFERIOR DE FACTOR DE DIRECTIVIDAD
  Q=q.value();  // Factor de Directividad.
    if(Q<1){
    q.value(1)
  }
  N=n.value();   //Número de fuentes.
  ///  LIMITE DE NUMERO DE FUENTES
    if(N>4){
    n.value(4)
    }else{
    if(N<1){
    n.value(1)
    }
    }
  
  
  r=map(x,67,690,0,D); //Distancia en metros entre altavoz y micrófono.
 
////////
//  SECCIÓN QUE LIMINTA EL MOVIMIENTO
//       DEL MICRÓFON EN EL CANVAS
//////// 
  if(mouseY>260 && mouseY<443){
    if(mouseIsPressed){
      x=mouseX-67;
      if(x<67){
        x=67;
      }
      if(x>690){
        x=690;
      }
    }
  }

  
  
////////
//  INIDCADOR DE POSICIÓN
//////// 
  push()
  fill(70, 70, 70)
  textSize(20);
  text(round(r,2)+"[m]",x-10,380);
  text("Lp="+NPS+"[dB]",x-30,320);
  stroke(128, 128, 128);
  line(70,400,x+10,399); //eje X
  circle(x+15,400,10);//Eje X
  pop()

  
////////
//  Cálculo de NPS
////////   

  if(LW==0 || D==0 || r==0){
    NPS=0
  }else{
     NPS=round( +LW+10*Math.log10(Q) -20*Math.log10(r)-10.915596+10*Math.log10(N),3);
  }
  
  //NPS=+LW+  10*(log(Q)/log(10))  -20*(log(D)/log(10))-10.915596;
  
  
////////// 
//  SECCION NÚMERO DE FUENTES  
/////////

if(N==1){
  image(altavoz,0,530-h*1,h,h);
}else{
  if (N==2){
          image(altavoz,0,530-h*1,h,h);
          image(altavoz,0,530-h*2,h,h);
  }else{if(N==3){
               image(altavoz,0,530-h*1,h,h);
               image(altavoz,0,530-h*2,h,h);  
               image(altavoz,0,530-h*3,h,h); 
  }else{if(N==4){
                image(altavoz,0,530-h*1,h,h);
                image(altavoz,0,530-h*2,h,h);  
                image(altavoz,0,530-h*3,h,h);                 
                image(altavoz,0,530-h*4,h,h);  
  }}}}
    
  
    
  
  
  
  
  //image(altavoz,0,3*height/4-h,h,h);
  image(microfono,x,530-hm,110,232);
  
  
  if(AUX==false){
      
    push()
      fill(255,255,255);
      rect(250,85,545,175,15);
      pop()
    
    for(let i=1;i<instrucciones.length; i++){
      push()
      fill(0)
      textSize(15)
      text(instrucciones[i],260,85+10*i);
      pop()
    }//Fin FOR
  }//Fin IF

  //print(AUX)
  
} //Fin DRAW

function Click1(){
  AUX=!AUX;

}



