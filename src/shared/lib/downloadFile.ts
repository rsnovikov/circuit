export const downloadFile = (href: string, name: string) => {
  var link = document.createElement('a');
  link.download = name;
  link.href = href;
  link.click();
};
