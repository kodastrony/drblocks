// Shared business data — identical across locales, so it lives outside the
// translated SiteContent dictionaries.

export const company = {
  name: "DrBlocks",
  legal: "Jimmyworld Jakub Stryjewski",
  phone: "+48 506 057 727",
  phoneHref: "tel:+48506057727",
  emailContact: "kontakt@drblocks.pl",
  emailSales: "sprzedaz@drblocks.pl",
  emailPartner: "kontakt@drblocks.pl",
  nip: "9372592697",
  regon: "362105276",
  instagram: "https://www.instagram.com/drblocksforbuildings/",
  instagramHandle: "@drblocksforbuildings",
} as const;

export type Company = typeof company;
