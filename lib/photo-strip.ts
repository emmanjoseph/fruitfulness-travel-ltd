export type PhotoStripSlide = {
    src: string;
    alt: string;
};

export const PHOTO_STRIP_IMAGE_FALLBACK = "/images/safari.jpg";

const DEFAULT_PHOTO_STRIP_SLIDES: PhotoStripSlide[] = [
    {
        src: "/images/safari.jpg",
        alt: "Safari landscape",
    },
    {
        src: "/images/samburu.jpg",
        alt: "Samburu safari",
    },
    {
        src: "/bg-1.png",
        alt: "African safari scene",
    },
    {
        src: "/Section.png",
        alt: "Travel landscape",
    },
];

const getStringValue = (value: unknown): string | null => {
    if (typeof value !== "string") return null;

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
};

const getImageSource = (value: unknown): string | null => {
    const direct = getStringValue(value);
    if (direct) return direct;

    if (!value || typeof value !== "object") return null;

    const record = value as Record<string, unknown>;
    const sourceKeys = [
        "src",
        "url",
        "imgUrl",
        "imageUrl",
        "landscape",
        "large",
        "medium",
        "original",
    ];

    for (const key of sourceKeys) {
        const source = getImageSource(record[key]);
        if (source) return source;
    }

    return null;
};

const getImageAlt = (value: unknown, fallbackAlt: string): string => {
    if (!value || typeof value !== "object") return fallbackAlt;

    const record = value as Record<string, unknown>;
    return (
        getStringValue(record.alt) ||
        getStringValue(record.name) ||
        getStringValue(record.title) ||
        fallbackAlt
    );
};

export const normalizePhotoStripSlides = (
    value: unknown,
    fallbackAlt = "Safari",
): PhotoStripSlide[] => {
    const items = Array.isArray(value) ? value : [value];
    const seen = new Set<string>();

    return items.reduce<PhotoStripSlide[]>((slides, item) => {
        const src = getImageSource(item);
        if (!src || seen.has(src)) return slides;

        seen.add(src);
        slides.push({
            src,
            alt: getImageAlt(item, fallbackAlt),
        });

        return slides;
    }, []);
};

export const getPhotoStripFallback = (details?: Record<string, unknown>): PhotoStripSlide[] => {
    const fallbackAlt =
        getStringValue(details?.location) ||
        getStringValue(details?.name) ||
        "Safari";

    const journeyImages = normalizePhotoStripSlides(
        [
            details?.imgUrl,
            details?.imageUrl,
            details?.heroImage,
            details?.coverImage,
            ...(Array.isArray(details?.images) ? details.images : []),
            ...(Array.isArray(details?.gallery) ? details.gallery : []),
            ...(Array.isArray(details?.photos) ? details.photos : []),
        ],
        fallbackAlt,
    );

    const defaultSlides = DEFAULT_PHOTO_STRIP_SLIDES.map((slide) => ({
        ...slide,
        alt: fallbackAlt,
    }));

    return normalizePhotoStripSlides([...journeyImages, ...defaultSlides], fallbackAlt).slice(0, 9);
};
