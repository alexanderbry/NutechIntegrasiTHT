function generateInvoiceNumber() {
    const prefix = "INV";
    const today = new Date();
  
    const date = today.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\./g, "");
  
    const counter = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  
    return `${prefix}${date}-${counter}`;
  }
 
module.exports = generateInvoiceNumber;
  