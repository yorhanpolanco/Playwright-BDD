Feature: Regression de consulta RNC

  Background:
    Given Usuario accede a la pagina de la DGII

  @smoke @regression @first
  Scenario Outline: Usuario consulta rnc correctamente
    Given Cargar datos del archivo "<jsonFile>" para el caso "<caso>"
    When El usuario despliega las opciones de herramientas para acceder a consulta RNC
    And El usuario realiza una consulta utilizando el "<rnc>"
    Then El usuario deberia ver los "<label>" de la consulta
    And El usuario deberia ver los "<datos>" del rnc consultado

    Examples:
      | jsonFile         | caso         | rnc | label           | datos            |
      | consultaRnc.json | casoValidos  | rnc | labelsEsperados | valoresEsperados |
      
  @fallidos #@first
  Scenario Outline: Usuario consulta rnc con data no valida
    Given Cargar datos del archivo "<jsonFile>" para el caso "<key>"
    When El usuario despliega las opciones de herramientas para acceder a consulta RNC
    And El usuario realiza una consulta utilizando el "<rnc>"
    Then El usuario deberia ver los "<label>" de la consulta
    And El usuario deberia ver los "<datos>" del rnc consultado

    Examples:
      | jsonFile         | key              | rnc | label                        | datos                         |
      | consultaRnc.json | casoValidos2.rnc | rnc | casoValidos2.labelsEsperados | casoValidos2.valoresEsperados |
      | consultaRnc.json | casoValidos2     | rnc | labelsEsperados               | valoresEsperados |
