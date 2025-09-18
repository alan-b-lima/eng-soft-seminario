class Personagem:
    def __init__(self, nome):
        self.nome = nome
        
    def atacar(self):
        print(f"{self.nome} realiza um ataque basico.")

class Guerreiro(Personagem):
    def atacar(self):
        print(f"{self.nome} ataca com sua ESPADA!")

class Mago(Personagem):
    def atacar(self):
        print(f"{self.nome} lança uma bola de FOGO!")

class GuerreiroMago(Mago, Guerreiro):
    def atacar(self):
        super().atacar()

spellsword = GuerreiroMago("Drako")
print(f"Chamando o metodo 'atacar()' de {spellsword.nome}...")
spellsword.atacar()

# Mostra a sequência de prioridade de chamada de métodos definida pelo Algoritmo C3 de Linearização MRO, ele procura a primeira correspondência e a executa.
# 1º [<class '__main__.GuerreiroMago'>, 
# 2º <class '__main__.Mago'>, 
# 3º <class '__main__.Guerreiro'>, 
# 4º <class '__main__.Personagem'>, 
# 5º <class 'object'>]
print(GuerreiroMago.mro())