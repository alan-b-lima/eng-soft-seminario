// @ minha/companhia/Imagem.java
public class Imagem {
    /* campos privados */

    public Cor pixelEm(int x, int y) { /* implementação */ }

    public void carregar(String caminho) { /* implementação */ }

    public void salvar(String caminho) { /* implementação */ }
}

// @ minha/companhia/ImagemDesenhavel.java
public class ImagemDesenhavel extends Imagem {
    /* campos privados */

    public void desenha(Traço traço) { /* implementação */ }

    public void carregar(String caminho) { 
        throw new Exception("Método 'carregar' é inválido");
    }
    
    public void salvar(String caminho) { 
        throw new Exception("Método 'salvar' é inválido");
    }
}