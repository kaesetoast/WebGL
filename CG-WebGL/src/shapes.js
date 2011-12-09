/*
 * WebGL / Javascript tutorial.
 * Author: Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * (C)opyright 2011 by Hartmut Schirmacher, all rights reserved. 
 *
 */


/* 

   Class: VertexBasedShape
   The shape holds an array of vertices, and knows how to 
   draw itself using WebGL.
    
    Parameters to the constructor:
    - program is the Program that these buffer objects shall be bound to  
    - primitiveType is the geometric primitive to be used for drawing,
      e.g. gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, 
            gl.TRIANGLE_FAN
    - numVertices is the number of vertices this object consists of
*/ 


VertexBasedShape = function(gl, primitiveType, numVertices) {

    // arrays in which to store vertex buffers and the respective 
    this.vertexBuffers = new Array();
    
    // remember what goemtric primitive to use for drawing
    this.primitiveType = primitiveType;
    
    // remember how many vertices this shape has
    this.numVertices = numVertices;
    
    // add a vertex attribute to the shape
    this.addVertexAttribute = function(gl, attrType, dataType, 
                                        numElements,dataArray) {
        this.vertexBuffers[attrType] = new VertexAttributeBuffer(gl,
                                            attrType, dataType,
                                            numElements,dataArray);
        var n = this.vertexBuffers[attrType].numVertices;
        if(this.numVertices != n) {
            window.console.log("Warning: wrong number of vertices (" 
                                + n + " instead of " + this.numVertices 
                                + ") for attribute " + attrType);
        }
    }
    
    /* 
       Method: draw using a vertex buffer object
    */
    this.draw = function(program) {
    
        // go through all types of vertex attributes 
        // and enable them before drawing
        for(attribute in this.vertexBuffers) {
            //window.console.log("activating attribute: " + attribute);
            this.vertexBuffers[attribute].makeActive(program);
        }
        
        // perform the actual drawing of the primitive 
        // using the vertex buffer object
        //window.console.log("drawing shape with " + 
        //                    this.numVertices + " vertices.");
        program.gl.drawArrays(primitiveType, 0, this.numVertices);

    }
}
             
/* 

   Class:  Triangle
   The triangle consists of three vertices. 
    
   Parameters to the constructor:
   - program is a Program object that knows which vertex attributes 
     are expected by its shaders
   
*/ 

Triangle = function(gl) {

    // instantiate the shape as a member variable
    this.shape = new VertexBasedShape(gl, gl.TRIANGLES, 3);

    var vposition = new Float32Array( [ 0,1,0,  -1,-1,0, 1,-1,0 ]);
    var vcolor    = new Float32Array( [ 1,0,0,  0,1,0,   0,0,1 ]);
    this.shape.addVertexAttribute(gl, "vertexPosition", gl.FLOAT, 3,
                                  vposition);
    this.shape.addVertexAttribute(gl, "vertexColor",    gl.FLOAT, 3, 
                                  vcolor);
    
}        
    

/* 

   Class:  TriangleFan
   A little fan around a center vertex. 
    
   Parameters to the constructor:
   - program is a Program object that knows which vertex attributes 
     are expected by its shaders
   
*/ 

TriangleFan = function(gl) {

    // instantiate the shape as a member variable
    this.shape = new VertexBasedShape(gl, gl.TRIANGLE_FAN, 9);

    var vposition = new Float32Array( [ 0,0,1,        0,1,0,       -0.7,0.7,0, 
                                        -1,0,0,      -0.7,-0.7,0,  0,-1,0, 
                                        0.7,-0.7,0,  1.0,0,0,      0.7,0.7,0]);
    var vcolor    = new Float32Array( [ 1,1,1,  1,0,0,  0,1,0,      
                                        0,0,1,  1,0,0,  0,1,0,  
                                        0,0,1,  1,0,0,  0,1,0,    ]);
    this.shape.addVertexAttribute(gl, "vertexPosition", gl.FLOAT, 3, vposition);
    this.shape.addVertexAttribute(gl, "vertexColor",    gl.FLOAT, 3, vcolor);
    
}        
    
