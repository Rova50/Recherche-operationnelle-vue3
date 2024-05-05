
import { ref } from 'vue';

// Composable pour les opérations de matrice
export default function useMatrixInit(rows, cols) {
  const tables = ref(Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => '')
  ));
  const tableLine = ref(Array.from({ length: rows }, () => ''));
  const tableColumn = ref(Array.from({ length: cols }, () => ''));

  return {
    tables,
    tableLine,
    tableColumn,
  };
}
