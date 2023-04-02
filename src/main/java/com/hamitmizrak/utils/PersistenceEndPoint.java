package com.hamitmizrak.utils;

public class PersistenceEndPoint {
    // Unicode Characters to Java Entities Converter
    // https://itpro.cz/juniconv/

    //CREATE
    /*
    POST /api/v1/register HTTP/1.1
    Host: localhost:4444
    Content-Type: application/json
    Content-Length: 104

    {
        "username":"Hamit Mızrak2",
        "email":"hamitmizrak2@gmail.com",
        "password":"Hm123456@"
    }
    */


    //LIST
    /*
    GET /api/v1/list HTTP/1.1
    Host: localhost:4444
    */


    //FIND
    /*
    GET /api/v1/register/3 HTTP/1.1
    Host: localhost:4444
     */

    //UPDATE
    /*
    PUT /api/v1/register/1 HTTP/1.1
    Host: localhost:4444
    Content-Type: application/json
    Content-Length: 108

    {
        "username":"Hamit Mızrak111",
        "email":"hamitmizrak111@gmail.com",
        "password":"Hm111111@"
    }
     */

    //DELETE
    /*
    DELETE /api/v1/register HTTP/1.1
    Host: localhost:4444
     */

}
