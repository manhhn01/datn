export const DEFAULT_AVATAR = '/images/default_avatar.jpeg';
export const DEFAULT_IMAGE = '/images/default_image.jpeg';

export const getImageUrl = (image: string | undefined | null, fallbackImage?: string) => {
  if (!image) {
    return fallbackImage || '';
  }

  if(image.startsWith('/')) {
    return image;
  }

  return `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image}`;
};

export const getDocumentUrl = (document: string | undefined | null) => {
  if (!document) {
    return '';
  }

  if(document.startsWith('/')) {
    return document;
  }

  return `${process.env.NEXT_PUBLIC_DOCUMENT_DOMAIN}/${document}`;
}
