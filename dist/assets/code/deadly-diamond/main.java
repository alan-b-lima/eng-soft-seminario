class Personagem {
    protected String nome;

    public Personagem(String nome) {
        this.nome = nome;
    }

    public void mostrarStatus() {
        System.out.println("Personagem: " + this.nome);
    }
}

class Guerreiro extends Personagem {
    public Guerreiro(String nome) {
        super(nome);
    }

    public void ataqueFisico() {
        System.out.println(this.nome + " ataca com a ESPADA!");
    }
}

class Mago extends Personagem {
    public Mago(String nome) {
        super(nome);
    }

    public void lancarMagia() {
        System.out.println(this.nome + " lança uma bola de FOGO!");
    }
}

// Erro de sintaxe em tempo de compilação, a gramática do Java não
// permite que o extends tenha mais de um argumento. Isso vem do fato
// do Java não permitir herança multipla.
class GuerreiroMago extends Guerreiro, Mago {
    public GuerreiroMago(String nome) {
        super(nome);
    }

    public void atacar() {
        System.out.println(this.nome + " tenta atacar.");
    }
}

public class Guerreiros {
    public static void main(String[] args) {
        System.out.println("Este codigo nao sera compilado.");
    }
}