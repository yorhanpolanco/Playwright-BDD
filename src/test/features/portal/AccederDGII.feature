Feature: Acceder a DGII y consultar BD

  Background:
    Given Usuario accede a la pagina de la DGII

  @regression
  Scenario Outline: Usuario consulta rnc que obtuvo desde la BD correctamente - "<caso>"
    When El usuario despliega las opciones de herramientas para acceder a consulta RNC
    And Ejecutar "<consulta>" Oracle en "<BD>" usuario "<user>"
    And El usuario realiza una consulta utilizando el "<rnc>"
    Then El usuario deberia ver los "<label>" de la consulta
    And Mostrar resultado del query por consola

    Examples:
      | jsonFile         | caso        | rnc | BD | user    | consulta | label           |
      | consultaRnc.json | casoValidos | rnc | BD | usuario | query    | labelsEsperados |
