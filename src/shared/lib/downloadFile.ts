export const downloadFile = (href: string, name: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = href;
  link.click();
  URL.revokeObjectURL(href);
};
