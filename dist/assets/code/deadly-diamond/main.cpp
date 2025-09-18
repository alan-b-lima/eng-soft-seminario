#include <iostream>
#include <string>

class Personagem {
public:
	std::string nome;
	Personagem(std::string n) : nome(n) {}
	virtual void atacar() {
		std::cout << nome << " realiza um ataque basico." << std::endl;
	}
};

class Guerreiro : public virtual Personagem {
public:
	Guerreiro(std::string n) : Personagem(n) {}
	void atacar() override {
		std::cout << nome << " ataca com sua ESPADA!" << std::endl;
	}
};

class Mago : public virtual Personagem {
public:
	Mago(std::string n) : Personagem(n) {}
	void atacar() override {
		std::cout << nome << " lanca uma bola de FOGO!" << std::endl;
	}
};

class GuerreiroMago : public Guerreiro, Mago {
public:
	GuerreiroMago(std::string n) : Personagem(n), Guerreiro(n), Mago(n) {}

	void atacar() override {
		std::cout << "O GuerreiroMago combina suas habilidades:" << std::endl;
		Guerreiro::atacar();
		Mago::atacar();
	}
};

int main() {
	GuerreiroMago spellsword("Drako");
	// Execução conforme a implementação na classe GuerreiroMago:
	//     1. Primeiro, executa a implementação completa de Guerreiro::atacar()
	//     2. Em seguida, executa a implementação completa de Mago::atacar()
	spellsword.atacar();
	return 0;
}