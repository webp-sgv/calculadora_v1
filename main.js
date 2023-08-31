var lastBtnSelected = "";

// CRIA UM LOOP DE REPETICAO PARA CRIAR BOTÕES DA CALCULADORA
const createBtn = () => {

    let rowLeft = [
        { idEl: "ul_left", number: [true, true, true], keys: [7, 8, 9], col: ["", "", ""], type: ["btn-primary", "btn-primary", "btn-primary"] },
        { idEl: "ul_left", number: [true, true, true], keys: [4, 5, 6], col: ["", "", ""], type: ["btn-primary", "btn-primary", "btn-primary"] },
        { idEl: "ul_left", number: [true, true, true], keys: [1, 2, 3], col: ["", "", ""], type: ["btn-primary", "btn-primary", "btn-primary"] },
        { idEl: "ul_left", number: [true, false], keys: [0, ","], col: ["col-8", "", ""], type: ["btn-success", "btn-primary"] },
    ];
    let rowRigth = [
        { idEl: "ul_right", number: [false, false], keys: ["CE", "C"], col: ["", ""], type: ["btn-danger", "btn-warning"] },
        { idEl: "ul_right", number: [false, false], keys: ["/", "*"], col: ["", ""], type: ["btn-primary", "btn-primary"] },
        { idEl: "ul_right", number: [false, false], keys: ["-", "+"], col: ["", ""], type: ["btn-info", "btn-primary"] },
        { idEl: "ul_right", number: [false], keys: ["="], col: [""], type: ["btn-dark"] },
    ];

    // LAÇO DE REPETIÇÃO PARA LISTA [LEFT]
    for (let lf in rowLeft) {

        // ELEMENTO ELEMENTOS DA LI
        var elLi = "";

        // LOOP PARA INSERIR ELEMENTOS NO LI
        for (let lf_ky in rowLeft[lf].keys) {
            elLi += `
                <div class="col ${rowLeft[lf].col[lf_ky]}">
                    <button onclick="captureActionBtn('${rowLeft[lf].keys[lf_ky]}', ${rowLeft[lf].number[lf_ky]})" type="button" class="btn ${rowLeft[lf].type[lf_ky]}">${rowLeft[lf].keys[lf_ky]}</button>
                </div>
            `;
        }

        // CRIA A LI COM ELEMENTOS
        document.getElementById(rowLeft[lf].idEl).innerHTML += `
            <li class="row text-center">
                ${elLi}
            </li>
        `;

    }

    // LAÇO DE REPETIÇÃO PARA LISTA [RIGHT]
    for (let rg in rowRigth) {

        // ELEMENTO ELEMENTOS DA LI
        var elLi = "";

        // LOOP PARA INSERIR ELEMENTOS NO LI
        for (let rg_ky in rowRigth[rg].keys) {
            elLi += `
                <div class="col ${rowRigth[rg].col[rg_ky]}">
                    <button onclick="captureActionBtn('${rowRigth[rg].keys[rg_ky]}', ${rowRigth[rg].number[rg_ky]})" type="button" class="btn ${rowRigth[rg].type[rg_ky]}">${rowRigth[rg].keys[rg_ky]}</button>
                </div>
            `;
        }

        // CRIA A LI COM ELEMENTOS
        document.getElementById(rowRigth[rg].idEl).innerHTML += `
            <li class="row text-center">
                ${elLi}
            </li>
        `;

    }

}

// CAPTURA AÇÃO DO BOTÃO
const captureActionBtn = async (key, number) => {
    
    // IDENTIFICADOR DOS INPUTS
    var inputPrimary, inputPrincipalReal, inputSecondary, inputSecondaryReal, coin, region;
    inputPrimary = "inputPrincipal";
    inputPrincipalReal = "inputPrincipalReal";
    inputSecondary = "inputSecondario";
    inputSecondaryReal = "inputSecondarioReal";
    coin = "BRL";
    region = "pt-BR"

    // FUNÇÃO RECICLADA PARA LIMPAR INPUT PRINCIPAL
    const clearInputPrimary = async () => {
        
        // INSERE O VALOR DO INPUT PRIMARIO = 0
        document.getElementById(inputPrimary).value = "";

        // CRIA UM NUMERO EM FORMATO DE REAL
        var real = await formatReal(0, coin, region);

        // INSERE O VALOR DO INPUT PRIMARIO NO PRIMARIO REAL
        document.getElementById(inputPrincipalReal).value = real;

    }

    // FUNÇÃO RECICLADA PARA LIMPAR INPUT SECUNDARIO
    const clearInputSecondary = async () => {
        document.getElementById(inputSecondary).value = "";
    }

    // FUNÇÃO RECICLADA PARA INSERIR VALOR NO INPUT PRIMARIO
    const insertValInputPrimary = async (value, operation) => {

        // RESERVA O VALOR ATUAL DO INPUT PRINCIPAL
        var valueCurrentInputPrimary = document.getElementById(inputPrimary).value;

        // RESERVA O VALOR ATUAL DO INPUT SECONDARIO
        var valueCurrentInputSecondary = document.getElementById(inputSecondary).value;
        
        // FORÇA A TRANSFORMAR O VALOR CAPTURADO DO INPUT PRIMARIO EM INTEIRO
        valueCurrentInputPrimary = parseInt(valueCurrentInputPrimary) == 0 || parseInt(valueCurrentInputPrimary) ? parseInt(valueCurrentInputPrimary) : 0;

        // FORÇA A TRANSFORMAR O VALOR CAPTURADO DO INPUT SECONDARIO EM INTEIRO
        valueCurrentInputSecondary = parseInt(valueCurrentInputSecondary) == 0 || parseInt(valueCurrentInputSecondary) ? parseInt(valueCurrentInputSecondary) : 0;
        
        // INSERE NO INPUT SECUNDARIO O VALOR DO PRIMARIO
        switch (operation) {
            case 'sub':
                await insertValInputSecondary(valueCurrentInputSecondary - valueCurrentInputPrimary);
                break;
            case 'equal':
                await insertValInputSecondary(valueCurrentInputPrimary + valueCurrentInputSecondary);
                break;
            case 'sum':
                await insertValInputSecondary(valueCurrentInputPrimary + valueCurrentInputSecondary);
                break;
            default:
                break;
        }
        
    }

    // FUNÇÃO RECICLADA PARA INSERIR VALOR NO INPUT SECUNDARIO
    const insertValInputSecondary = async (value) => {
        
        // FAZ A CONVERSAO PARA REAL
        var real = await formatReal(value, coin, region);
        document.getElementById(inputSecondary).value = value;
        document.getElementById(inputSecondaryReal).value = real;
    }
            
    // VEREFICA SE É UM NUMERO
    if (number == true) {

        // VERIFICA SE O ULTIMO NUMERO PRESSIONADO FOI UMA OPERAÇÃO
        switch (lastBtnSelected) {
            case '=':
                await clearInputPrimary(); // APAGA O INPUT PRIMARIO

                lastBtnSelected = "";

                // FINALIZA O SWITCH
                break;
            case '-':
                await clearInputPrimary(); // ''

                lastBtnSelected = "";

                // FINALIZA O SWITCH
                break;
            case '+':
                await clearInputPrimary(); // ''

                lastBtnSelected = "";

                // FINALIZA O SWITCH
                break;
            default:
                // REDEFINE O ULTIMO BOTÃO SELECIONADO
                lastBtnSelected = "";

                // FINALIZA O SWITCH
                break;
        }

        // INCLUI UM NUMERO NO INPUT PRINCIPAL
        document.getElementById(inputPrimary).value += key;

        // INCLUI UM NUMERO NO INPUT PRINCIPAL REAL
        var value = document.getElementById(inputPrimary).value;
        var real = await formatReal(value, coin, region);
        document.getElementById(inputPrincipalReal).value = real;
        
    }

    // VERIFICA OS OPERADORES
    switch (key){
        case 'C': // VEREFICA SE É UMA KEY [C]
            // LIMPA O VALOR DO INPUT SECUNDARIO
            await clearInputSecondary();
            break;
        case 'CE': // VEREFICA SE É UMA KEY [CE]
            // LIMPA O VALOR DO INPUT PRINCIPAL
            await clearInputPrimary();
            break;
        case '+': // VERIFA SE É UM OPERADOR [+]
            // RESERVA O VALOR DO INPUT PRINCIPAL
            var valInputPrimary = document.getElementById(inputPrimary).value;
            // DEFINE O VALOR SECUNDARIO COM O VALOR PRINCIPAL
            await insertValInputPrimary(valInputPrimary, 'sum');
            // DEFINE O ULTIMO NUMERO PRESIONADO
            lastBtnSelected = key;
            break;
        case '-': // VERIFA SE É UM OPERADOR [-]
            // RESERVA O VALOR DO INPUT PRINCIPAL
            var valInputPrimary = document.getElementById(inputPrimary).value;
            // DEFINE O VALOR SECUNDARIO COM O VALOR PRINCIPAL
            await insertValInputPrimary(valInputPrimary, 'sub');
            // DEFINE O ULTIMO NUMERO PRESIONADO
            lastBtnSelected = key;
            break;
        case '=': // VERIFICA SE É UM OPERADOR [=]
            // RESERVA O VALOR DO INPUT PRINCIPAL
            var valInputPrimary = document.getElementById(inputPrimary).value;
            // DEFINE O VALOR SECUNDARIO COM O VALOR PRINCIPAL
            await insertValInputPrimary(valInputPrimary, 'equal');
            // DEFINE O ULTIMO NUMERO PRESIONADO
            lastBtnSelected = key;
            break;
        default:
            break;
    }

}

// FORMATAR PARA TIPO DE MOEDA
const formatReal = async (value, coin, region) => {
    
    // TENTA FAZER A CONVERSÃO
    try {
        value = new Intl.NumberFormat(region, { style: 'currency', currency: coin }).format(value);
    } catch (x) {
    } finally {
        return value;
    }
    
}

// INICAIR O CODIGO EM MODO ESTRITO
createBtn();