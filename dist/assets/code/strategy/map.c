#include <stdlib.h>
#include <stdio.h>

void* map(void* arr, int len, int in_size, int out_size, void(*map_func)(void*, void*)) {
    void* result = malloc(len * out_size);
    for (int i = 0; i < len; i++) {
        map_func(result + i * out_size, arr + i * in_size);
    }
    return result;
}

void divide_by_two(void* result, void* input) {
    *(double*)result = (double)(*(int*)input) / 2.0;
}

int main() {
    int nums[] = { 0, 1, 2, 3, 4, 5 };
    int len = sizeof(nums) / sizeof(int);
    double* half = map(nums, len, sizeof(int), sizeof(double), divide_by_two);

    for (int i = 0; i < 6; i++) { printf("%d, ", nums[i]); }
    putchar('\n');

    for (int i = 0; i < 6; i++) { printf("%f, ", half[i]); }
    putchar('\n');

    free(half);
    return 0;
}