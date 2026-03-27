Feature: Ejecucion de Api

  @smoke @regression @smokeApi
  Scenario Outline: Ejecutar api
    Given Cargar datos del archivo "<jsonFile>" para el caso "<caso>"
    And Ejecutar metodo "<metodo>" en "<url>""<endpoint>" con "<header>", autorizacion "<auth>" y data "<data>"
    Then Mostrar response del api que se ejecuto

    Examples:
      | jsonFile        | caso       | metodo | url     | endpoint | header   | auth         | data  |
      | apiExample.json | escenario1 | get    | urlBase | ruta     | cabecera | autorizacion | datos |
      | apiExample.json | escenario3 | post   | urlBase | ruta     | cabecera | autorizacion | datos |
