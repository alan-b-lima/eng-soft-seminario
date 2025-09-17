// @ java/util/Comparator.java
@FunctionalInterface
public interface Comparator<E> {
    int compare(E o0, E o1);
}

// @ minha/companhia/Main.java
public class Main {
    public static void main(String[] args) {
        Comparator<Integer> comp1 = new Comparator<>() {
            @Override
            public int compare(Integer o0, Integer o1) {
                return o0 - o1;
            }
        }

        Comparator<Integer> comp2 = (o0, o1) -> o0 - o1;

        // comp1 é equivalente ao comp2 e, internamente, identico.
    }
}