import { Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';
import { Utilidades } from '../utilidades/playwright-utilidades';
import Logs from './logConfig';

export default class CustomReporter implements Reporter {

    onTestBegin(test: TestCase, result: TestResult) {
        const featureName = test.parent.parent?.title || test.parent.title;
        const scenarioName = test.title;
        const workerPrefix = `[W${result.workerIndex}] `;
        
        const log = `${workerPrefix}FEATURE: ${featureName}`;
        const nombreEscenario = `${workerPrefix}SCENARIO: ${scenarioName}`;
        
        void Utilidades.agregarLineaAlLog(Logs.formantCabecera(log.toUpperCase()), true);
        void Utilidades.agregarLineaAlLog(nombreEscenario.toUpperCase(), true);
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
        if (step.category === 'test.step' && (step.title.startsWith('Given ') || step.title.startsWith('When ') || step.title.startsWith('Then ') || step.title.startsWith('And '))) {
            const log = `[W${result.workerIndex}] Se esta ejecutando el step: ${step.title}`;
            void Utilidades.agregarLineaAlLog(log, true);
        }
    }

    onTestEnd(test: TestCase, result: TestResult) {
        if (result.status === 'failed') {
            const errorMessage = `[W${result.workerIndex}] Error: ${result.error?.message || 'Error desconocido'}`;
            void Utilidades.agregarLineaAlLog(errorMessage, false);
        }
        void Utilidades.agregarLineaAlLog(`[W${result.workerIndex}] Fue finalizado el escenario de prueba!`);
    }
}
