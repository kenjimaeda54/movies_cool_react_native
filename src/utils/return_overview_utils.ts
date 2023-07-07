export function returnOverview(overview: string): string {
  return overview?.length > 0
    ? overview
    : 'Não existe uma descrição para esta serie ou filme'
}
