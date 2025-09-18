import jfx from "../jfx-components.js";
import { element } from "../jsxmm/jsxmm.js";
import { new_bullet_list, new_code_block_fetch, new_slide_window, new_two_columns } from "./common.js";
function new_extract_interface_slide_1(window_data) {
    const suspecious_tux = element("div", { className: "image-cell" }, element("img", { alt: "Suspicious Tux", src: "./assets/images/tux.png" }));
    const slide_window = (new_slide_window(window_data, "extract-interface", element("main", { className: "tux-spy" }, element("h1", {}, "Extração de Interface"), element("article", {}, element("p", {}, "Problema: há classes distintas em que um subconjunto de seus métodos públicos possui mesma assinatura e responsabilidade conceitual, mas implementações próprias."), element("p", {}, "A técnica consiste, então, em definir uma estrutura de interface que declare esse conjunto de operações comuns, de modo que cada classe concreta (que o contiver) forneça, para ele, a sua respectiva implementação.")), suspecious_tux)));
    slide_window.animation(animation_extract_interface_slide_1.bind(null, suspecious_tux));
    return slide_window;
}
function* animation_extract_interface_slide_1(image) {
    image.classList.add("hide");
    setTimeout(() => {
        image.classList.remove("hide");
    }, 2000);
}
function new_extract_interface_slide_fs_1(window_data) {
    const slide_window = (new_slide_window(window_data, "extract-interface", element("main", { className: "titled" }, element("h1", { style: { fontStyle: "italic" } }, "Everything is a file"), jfx.new_panel(element("article", {}, element("p", {}, "Na família de sistemas UNIX, (quase) tudo é um arquivo."), element("p", {}, "Os objetos do SO, manejam-se de forma homogênea: são abarcados pela abstração ", jfx.new_button("file"), " - cujos elementos compõem o sistema de arquivos - sobre a qual é definida uma interface comum de syscalls, tais como ", jfx.new_button("open()"), ", ", jfx.new_button("close()"), ", ", jfx.new_button("read()"), ", ", jfx.new_button("write()"), ".")), element("div", { className: "hello" }, ...[
        "                /-=$$         ",
        "            %%%%%%            ",
        "         %%%%%%%%%%%          ",
        "        %&(∙)%%%%(∙)&%        ",
        "$$$$   %%%%%%⌐¨¨¬%%%%%    $$$$",
        "  $$$$ %%%%%¨----¨%%%%% $$$$  ",
        "   $$$$@%%%%%@%%%%%%@%% $$$$  ",
        "    $@%@%@%@@%@@%@%@%@%$$     ",
        "    @@@@@@@@@@@@@@@@@@@       ",
        "   █@▄@▌@▐▄@@@▄█▌@@██@@█      ",
        "   █████████████████████      ",
        "   ██   Hello World   ██      ",
        "    ▀█████████████████▀       ",
        "      ▀████████████▀▀         ",
    ].reduce((acc, line) => {
        acc.push(line, element("br"));
        return acc;
    }, []))))));
    slide_window.element().classList.add("aside");
    return slide_window;
}
async function new_extract_interface_slide_fs_2(window_data) {
    const slide_window = (new_slide_window(window_data, "extract-interface", element("main", { className: "titled" }, element("h1", {}, "A Primeira Abordagem"), new_two_columns(await new_code_block_fetch("./assets/code/extract-interface/file.h", "c"), await new_code_block_fetch("./assets/code/extract-interface/file.c", "c")))));
    return slide_window;
}
function new_extract_interface_slide_fs_3(window_data) {
    const slide_window = (new_slide_window(window_data, "extract-interface", element("main", { className: "titled" }, element("h1", {}, "A Implementação"), element("article", {}, element("p", {}, [
        "Suponha que sejam adicionados mais tipos de arquivos, sistemas de",
        "arquivos e, ainda, que estes precisem ser administrados por",
        "diferentes indivíduos e de forma modular.",
    ].join(" ")), element("p", {}, "Para tanto, precisar-se-ia, para cada enumeração:"), new_bullet_list("modificar a enumeração de tipos de arquivo;", element("span", {}, "adicionar novo ", jfx.new_button("if"), " em ", jfx.new_button("fileread()"), " e demais funções que agem sobre arquivos;"), "recompilar todo o kernel (mesmo para o simples caso da adição de um novo driver);", "testar todas as funcionalidades.")))));
    return slide_window;
}
async function new_extract_interface_slide_fs_4(window_data) {
    const slide_window = (new_slide_window(window_data, "extract-interface", element("main", { className: "titled" }, element("h1", {}, "A Expansão: O Núcleo Linux"), jfx.new_panel(element("article", {}, element("p", {}, [
        "O princípio é estendido para sockets e dispositivos. Não há mais um único",
        "sistema de arquivo, mas a possibilidade de diversos: ext4, btrfs, xfs, etc.",
    ].join(" ")), element("p", {}, "Se a abordagem anterior fosse seguida, o resultado seria como ao lado:")), await new_code_block_fetch("./assets/code/extract-interface/file-2.c", "c")))));
    slide_window.element().classList.add("aside");
    return slide_window;
}
async function new_extract_interface_slide_fs_5(window_data) {
    const slide_window = (new_slide_window(window_data, "extract-interface", element("main", { className: "titled" }, element("h1", {}, "A Expansão: O Núcleo Linux"), jfx.new_panel(element("article", {}, element("p", {}, [
        "Os problemas da abordagem do UNIX V6 foram solucionados, no Linux, pela técnica",
        "de extração de interface. É criada a interface "
    ].join(" "), jfx.new_button("file_operations"), ":")), new_two_columns(await new_code_block_fetch("./assets/code/extract-interface/fs.h", "c"), await new_code_block_fetch("./assets/code/extract-interface/fs-op.h", "c"))))));
    slide_window.element().classList.add("linux");
    return slide_window;
}
async function new_extract_interface_slide_fs_6(window_data) {
    const slide_window = (new_slide_window(window_data, "extract-interface", element("main", { className: "titled" }, element("h1", {}, "A Expansão: O Núcleo Linux"), jfx.new_panel(element("article", {}, element("p", {}, [
        "Dessa forma, o tipo de arquivo ou o sistema de arquivos, e não o código",
        "genérico do núcleo, ficam responsáveis pela implementação da interface.",
        "O núcleo é, assim, agnóstico e só precisa saber o que e quando, mas não",
        "como. Consequentemente:"
    ].join(" ")), new_bullet_list("mantém-se a interface única (a ser usada pelas syscalls);", "é baixo o acoplamento;", "a lógica da implementação é encapsulada;", "garante-se extensibilidade sem modificação do código existente;", "erros são locais.")), await new_code_block_fetch("./assets/code/extract-interface/fs-op.h", "c")))));
    slide_window.element().classList.add("aside");
    return slide_window;
}
async function new_extract_interface_slide_fs_7(window_data) {
    const slide_window = (new_slide_window(window_data, "extract-interface", element("main", { className: "titled" }, element("h1", {}, "Implementando meu Dispositivo"), await new_code_block_fetch("./assets/code/extract-interface/my-device.c", "c"))));
    return slide_window;
}
export default async function (window) {
    return [
        new_extract_interface_slide_1(window),
        new_extract_interface_slide_fs_1(window),
        await new_extract_interface_slide_fs_2(window),
        new_extract_interface_slide_fs_3(window),
        await new_extract_interface_slide_fs_4(window),
        await new_extract_interface_slide_fs_5(window),
        await new_extract_interface_slide_fs_6(window),
        await new_extract_interface_slide_fs_7(window),
    ];
}
