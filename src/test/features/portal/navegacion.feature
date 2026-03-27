Feature: Regresion google

  Background:
    Given Usuario accede a la pagina de google

  @google
  Scenario Outline: Usuario realiza consulta en google
    When El usuario escribe lo que desea buscar en google
    Then El sistema muestra el valor insertado
