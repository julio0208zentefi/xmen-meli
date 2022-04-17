<h1><u>XMEN Mercado Libre</u></h1>

![Tux, the Linux mascot](https://i.gifer.com/fetch/w300-preview/36/36eec9f5dc8a90c9af55505c0d3e3f4b.gif)

<p>Magneto quiere reclutar la mayor cantidad de mutantes para poder luchar
contra los X-Men.</p>

<p>Te ha contratado a ti para que desarrolles un proyecto que detecte si un
humano es mutante basándose en su secuencia de ADN.</p>

<p>Para eso te ha pedido crear un programa con un método o función con la siguiente firma (En
alguno de los siguiente lenguajes: Java / Golang / C-C++ / Javascript (node) / Python / Ruby)</p>

<p>En donde recibirás como parámetro un array de Strings que representan cada fila de una tabla
de (NxN) con la secuencia del ADN. Las letras de los Strings solo pueden ser: (A,T,C,G), las
cuales representa cada base nitrogenada del ADN.</p>

<h3>No Mutante</h3>
<table>
    <tr>
        <td>A</td><td>T</td><td>G</td><td>C</td><td>G</td><td>A</td>
    </tr>
    <tr>
        <td>C</td><td>A</td><td>G</td><td>T</td><td>G</td><td>C</td>
    </tr>
    <tr>
        <td>T</td><td>T</td><td>A</td><td>T</td><td>T</td><td>T</td>
    </tr>
    <tr>
        <td>A</td><td>G</td><td>A</td><td>C</td><td>G</td><td>G</td>
    </tr>
    <tr>
        <td>G</td><td>C</td><td>G</td><td>T</td><td>C</td><td>A</td>
    </tr>
    <tr>
        <td>T</td><td>C</td><td>A</td><td>C</td><td>T</td><td>G</td>
    </tr>
</table>

<br />

<h3>Mutante</h3>

<table>
    <tr>
        <td style="color:green">A</td><td>T</td><td>G</td><td>C</td><td style="color:blue">G</td><td>A</td>
    </tr>
    <tr>
        <td>C</td><td style="color:green">A</td><td>G</td><td>T</td><td style="color:blue">G</td><td>C</td>
    </tr>
    <tr>
        <td>T</td><td>T</td><td style="color:green">A</td><td>T</td><td style="color:blue">G</td><td>T</td>
    </tr>
    <tr>
        <td>A</td><td>G</td><td>A</td><td style="color:green">A</td><td style="color:blue">G</td><td>G</td>
    </tr>
    <tr>
        <td style="color:red">C</td><td style="color:red">C</td><td style="color:red">C</td><td style="color:red">C</td><td>T</td><td>A</td>
    </tr>
    <tr>
        <td>T</td><td>C</td><td>A</td><td>C</td><td>T</td><td>G</td>
    </tr>
</table>
 <br />

<p>Sabrás si un humano es mutante, si encuentras ​ más de una secuencia de cuatro letras
iguales​ , de forma oblicua, horizontal o vertical.</p>

<p>Ejemplo (Caso mutante):</p>

<code>String[] dna = {"ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"};</code>


<p>En este caso el llamado a la función isMutant(dna) devuelve “true”.</p>

<p><b>Desarrolla el algoritmo de la manera más eficiente posible.Desafíos:</b></p>


<h4>Nivel 1:</h4>

<p>Programa (en cualquier lenguaje de programación) que cumpla con el método pedido por
Magneto.</p>

<h4>Nivel 2:</h4>

<p>Crear una API REST, hostear esa API en un cloud computing libre (Google App Engine,
Amazon AWS, etc), crear el servicio “/mutant/” en donde se pueda detectar si un humano es
mutante enviando la secuencia de ADN mediante un HTTP POST con un Json el cual tenga el
siguiente formato:</p>

<code>POST → /mutant/
{
“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}</code>

<p>En caso de verificar un mutante, debería devolver un <b>HTTP 200-OK</b>, en caso contrario un
<b>403-Forbidden</b></p>

<h4>Nivel 3:</h4>

<p>Anexar una base de datos, la cual guarde los ADN’s verificados con la API. Solo 1 registro por ADN.</p>

<p>Exponer un servicio extra “/stats” que devuelva un Json con las estadísticas de las
verificaciones de ADN: <code>{“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}</code></p>

<p>Tener en cuenta que la API puede recibir fluctuaciones agresivas de tráfico (Entre 100 y 1
millón de peticiones por segundo).</p>

<p>Test-Automáticos, Code coverage > 80%.</p>

<p>Entregar:</p>

- Código Fuente (Para Nivel 2 y 3: En repositorio github).
- Instrucciones de cómo ejecutar el programa o la API. (Para Nivel 2 y 3: En README de
github).
- URL de la API (Nivel 2 y 3)

<h2><u>Solución</u></h2>

<h4> Se creó un stack con: </h4>

- API: NodeJS + Express
- DB: Apache Cassandra
- ESlint for code analyzing & styling
- Jest for unit testing
- Redis for Cache
- Hosted by Google Cloud services 

<h4> Otras herramientas </h4>

- GitHub CI/CD for running Tests & Eslint
- Swagger for API Documentation
- OAuth2 for API Authentication
- JMeter for stress testing

