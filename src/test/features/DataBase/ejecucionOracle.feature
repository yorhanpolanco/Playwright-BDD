Feature: Ejecucion de setencias en Oracle

  Scenario Outline: Ejecutar consulta de Oracle - "<caso>"
    Given Ejecutar "<consulta>" Oracle en "<BD>" usuario "<user>"
    Then Mostrar resultado del query por consola

    Examples:
      | jsonFile                  | query  | BD | user    | consulta |
      | pruebaEjecucionQuery.json | query1 | BD | usuario | query    |
