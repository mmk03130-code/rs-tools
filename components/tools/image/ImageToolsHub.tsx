import React, { useState, useRef, useEffect } from 'react';
import {
  Upload, Download, RefreshCw, Sliders, Scissors, Copy, Check,
  Maximize2, Crop, Stamp, FileCode2, Palette, ShieldCheck, Smile,
  Film, QrCode, Bookmark, Binary, Image as ImageIcon, Sparkles, AlertCircle
} from 'lucide-react';
import { ToolItem } from '../../../types/tools';
import QRCode from 'qrcode';

interface ImageToolsHubProps {
  tool: ToolItem;
}

export const ImageToolsHub: React.FC<ImageToolsHubProps> = ({ tool }) => {
  // Shared Image state
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number; size: number; name: string } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [resultSrc, setResultSrc] = useState<string | null>(null);
  const [resultMeta, setResultMeta] = useState<{ size: number; width?: number; height?: number } | null>(null);
  const [copied, setCopied] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Compressor state
  const [compressionQuality, setCompressionQuality] = useState<number>(75);
  const [compressFormat, setCompressFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');

  // 2. Format Converter state
  const [targetFormat, setTargetFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/webp');

  // 3. Background remover upgraded state
  const [bgTolerance, setBgTolerance] = useState<number>(32);
  const [edgeSoftness, setEdgeSoftness] = useState<number>(2);
  const [bgKeyMode, setBgKeyMode] = useState<'auto' | 'white' | 'green' | 'black'>('auto');
  const [bgDefringe, setBgDefringe] = useState<boolean>(true);
  const [bgVarianceSensitivity, setBgVarianceSensitivity] = useState<number>(1.2);
  const [previewMatte, setPreviewMatte] = useState<'checker' | 'white' | 'dark' | 'original'>('checker');

  // 4. Resizer state
  const [resizeWidth, setResizeWidth] = useState<number>(800);
  const [resizeHeight, setResizeHeight] = useState<number>(600);
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);

  // 5. Crop state
  const [cropAspect, setCropAspect] = useState<'free' | '1:1' | '16:9' | '4:3'>('1:1');

  // 6. Watermark state
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL ©');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.5);
  const [watermarkPos, setWatermarkPos] = useState<'center' | 'bottom-right' | 'diagonal'>('diagonal');
  const [watermarkColor, setWatermarkColor] = useState('#ffffff');

  // 7. SVG to Raster state
  const [svgInput, setSvgInput] = useState('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#3b82f6"/><polygon points="35,30 75,50 35,70" fill="white"/></svg>');
  const [svgScale, setSvgScale] = useState<number>(4);

  // 8. Palette extractor state
  const [extractedPalette, setExtractedPalette] = useState<string[]>([]);

  // 9. EXIF scrubber state
  const [metadataStripped, setMetadataStripped] = useState(false);

  // 10. Filters state
  const [filterBlur, setFilterBlur] = useState(0);
  const [filterBrightness, setFilterBrightness] = useState(100);
  const [filterContrast, setFilterContrast] = useState(100);
  const [filterGrayscale, setFilterGrayscale] = useState(0);
  const [filterInvert, setFilterInvert] = useState(0);

  // 11. Meme state
  const [memeTop, setMemeTop] = useState('WHEN YOUR CODE COMPILES');
  const [memeBottom, setMemeBottom] = useState('ON THE FIRST TRY');
  const [memeFontSize, setMemeFontSize] = useState(36);

  // 12. GIF tool state
  const [gifFrameCount, setGifFrameCount] = useState(1);

  // 13. QR Code state
  const [qrText, setQrText] = useState('https://rs-tools.app');
  const [qrDarkColor, setQrDarkColor] = useState('#000000');
  const [qrLightColor, setQrLightColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(320);

  // 14. Favicon state
  const [faviconSizes, setFaviconSizes] = useState<number[]>([16, 32, 48, 180, 512]);

  // 15. Base64 tool state
  const [base64Output, setBase64Output] = useState('');
  const [base64InputText, setBase64InputText] = useState('');

  // Handle image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      setResultSrc(null);
      setResultMeta(null);

      // Measure dimensions
      const img = new Image();
      img.onload = () => {
        setImageMeta({
          width: img.width,
          height: img.height,
          size: file.size,
          name: file.name,
        });
        setResizeWidth(img.width);
        setResizeHeight(img.height);

        // Auto trigger palette if in palette tool
        if (tool.id === 'palette-extractor') {
          extractColors(img);
        }
        // Auto trigger base64
        if (tool.id === 'image-base64') {
          setBase64Output(src);
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Extract Colors for palette tool
  const extractColors = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 100;
    canvas.height = 100;
    ctx.drawImage(img, 0, 0, 100, 100);
    const data = ctx.getImageData(0, 0, 100, 100).data;
    const colors: { [key: string]: number } = {};

    for (let i = 0; i < data.length; i += 16) {
      const r = Math.round(data[i] / 24) * 24;
      const g = Math.round(data[i + 1] / 24) * 24;
      const b = Math.round(data[i + 2] / 24) * 24;
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      colors[hex] = (colors[hex] || 0) + 1;
    }

    const sorted = Object.entries(colors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([hex]) => hex);

    setExtractedPalette(sorted.length ? sorted : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']);
  };

  // Run Compression
  const handleCompress = () => {
    if (!imageSrc) return;
    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const quality = compressionQuality / 100;
      const dataUrl = canvas.toDataURL(compressFormat, quality);
      setResultSrc(dataUrl);

      // Estimate compressed size
      const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
      const padding = (dataUrl.charAt(dataUrl.length - 2) === '=') ? 2 : ((dataUrl.charAt(dataUrl.length - 1) === '=') ? 1 : 0);
      const byteLength = (base64Length * 0.75) - padding;
      setResultMeta({ size: Math.round(byteLength), width: img.width, height: img.height });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Run Format Conversion
  const handleConvertFormat = () => {
    if (!imageSrc) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const converted = canvas.toDataURL(targetFormat, 0.92);
      setResultSrc(converted);
      setResultMeta({ size: Math.round(converted.length * 0.75), width: img.width, height: img.height });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Weighted perceptual Redmean color distance calculation
  const calcPerceptualDistance = (
    r1: number, g1: number, b1: number,
    r2: number, g2: number, b2: number
  ): number => {
    const rmean = (r1 + r2) >> 1;
    const dr = r1 - r2;
    const dg = g1 - g2;
    const db = b1 - b2;
    return Math.sqrt(
      (((512 + rmean) * dr * dr) >> 8) +
      (4 * dg * dg) +
      (((767 - rmean) * db * db) >> 8)
    );
  };

  // Smoothstep cubic Hermite interpolation for soft anti-aliased transitions
  const smoothStepHermite = (min: number, max: number, val: number): number => {
    const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
    return x * x * (3 - 2 * x);
  };

  // Run Background Removal (Chroma Key with Adjustable Variance & 2D Spatial Edge Feathering)
  const handleRemoveBackground = () => {
    if (!imageSrc) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const totalPixels = width * height;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        setProcessing(false);
        return;
      }
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // 1. Establish reference background color palette
      interface ColorVector { r: number; g: number; b: number; }
      let referenceColors: ColorVector[] = [];

      if (bgKeyMode === 'white') {
        referenceColors = [
          { r: 255, g: 255, b: 255 },
          { r: 248, g: 248, b: 248 },
          { r: 240, g: 240, b: 240 }
        ];
      } else if (bgKeyMode === 'green') {
        referenceColors = [
          { r: 0, g: 255, b: 0 },
          { r: 20, g: 240, b: 25 },
          { r: 10, g: 200, b: 15 }
        ];
      } else if (bgKeyMode === 'black') {
        referenceColors = [
          { r: 0, g: 0, b: 0 },
          { r: 12, g: 12, b: 12 },
          { r: 20, g: 20, b: 20 }
        ];
      } else {
        // Auto Edge & Perimeter Sampling with patch averaging
        const getPatchAverage = (px: number, py: number, patchSize: number = 7): ColorVector => {
          let sumR = 0, sumG = 0, sumB = 0, count = 0;
          const half = Math.floor(patchSize / 2);
          for (let dy = -half; dy <= half; dy++) {
            for (let dx = -half; dx <= half; dx++) {
              const x = Math.max(0, Math.min(width - 1, px + dx));
              const y = Math.max(0, Math.min(height - 1, py + dy));
              const idx = (y * width + x) * 4;
              sumR += data[idx];
              sumG += data[idx + 1];
              sumB += data[idx + 2];
              count++;
            }
          }
          return {
            r: Math.round(sumR / count),
            g: Math.round(sumG / count),
            b: Math.round(sumB / count)
          };
        };

        const margin = Math.max(2, Math.min(16, Math.floor(Math.min(width, height) * 0.02)));
        const sampleCoords = [
          { x: margin, y: margin }, // Top-Left
          { x: width - 1 - margin, y: margin }, // Top-Right
          { x: margin, y: height - 1 - margin }, // Bottom-Left
          { x: width - 1 - margin, y: height - 1 - margin }, // Bottom-Right
          { x: Math.floor(width / 2), y: margin }, // Top-Center
          { x: Math.floor(width / 2), y: height - 1 - margin }, // Bottom-Center
          { x: margin, y: Math.floor(height / 2) }, // Left-Center
          { x: width - 1 - margin, y: Math.floor(height / 2) } // Right-Center
        ];

        referenceColors = sampleCoords.map(pt => getPatchAverage(pt.x, pt.y));
      }

      // 2. Compute background variance loop
      let meanR = 0, meanG = 0, meanB = 0;
      for (const col of referenceColors) {
        meanR += col.r;
        meanG += col.g;
        meanB += col.b;
      }
      meanR /= referenceColors.length;
      meanG /= referenceColors.length;
      meanB /= referenceColors.length;

      let varianceSum = 0;
      for (const col of referenceColors) {
        varianceSum += Math.pow(col.r - meanR, 2) + Math.pow(col.g - meanG, 2) + Math.pow(col.b - meanB, 2);
      }
      const stdDeviation = Math.sqrt(varianceSum / referenceColors.length);

      // Dynamic variance factor scales tolerance to eliminate noisy background patches
      const dynamicVarianceFactor = Math.min(2.2, Math.max(0.75, 1.0 + (stdDeviation / 75) * (bgVarianceSensitivity - 1.0)));
      const baseTolerance = bgTolerance * 2.8 * dynamicVarianceFactor;
      const featherWidth = Math.max(2, edgeSoftness * 16);

      // Temporary Alpha Mask buffer for 2D spatial smoothing
      const alphaBuffer = new Uint8Array(totalPixels);

      // 3. Pixel classification pass (Chroma-Key variance check)
      for (let i = 0; i < totalPixels; i++) {
        const pIdx = i * 4;
        const r = data[pIdx];
        const g = data[pIdx + 1];
        const b = data[pIdx + 2];

        // Measure minimum perceptual distance across reference background clusters
        let minDist = Infinity;
        let closestRef = referenceColors[0];

        for (let j = 0; j < referenceColors.length; j++) {
          const ref = referenceColors[j];
          const dist = calcPerceptualDistance(r, g, b, ref.r, ref.g, ref.b);
          if (dist < minDist) {
            minDist = dist;
            closestRef = ref;
          }
        }

        // Apply adjustable variance loop and non-linear alpha curve
        if (minDist <= baseTolerance) {
          alphaBuffer[i] = 0; // Pure transparent background
        } else if (minDist < baseTolerance + featherWidth) {
          // Soft cubic Hermite sigmoid curve prevents harsh borders
          const alphaRatio = smoothStepHermite(baseTolerance, baseTolerance + featherWidth, minDist);
          alphaBuffer[i] = Math.round(255 * alphaRatio);

          // Color De-fringing: unmix background color bleed on transitional pixels
          if (bgDefringe) {
            const spillWeight = 1 - alphaRatio;
            data[pIdx] = Math.min(255, Math.max(0, Math.round(r - closestRef.r * spillWeight * 0.5) / (1 - spillWeight * 0.5)));
            data[pIdx + 1] = Math.min(255, Math.max(0, Math.round(g - closestRef.g * spillWeight * 0.5) / (1 - spillWeight * 0.5)));
            data[pIdx + 2] = Math.min(255, Math.max(0, Math.round(b - closestRef.b * spillWeight * 0.5) / (1 - spillWeight * 0.5)));
          }
        } else {
          alphaBuffer[i] = 255; // Completely opaque foreground
        }
      }

      // 4. Alpha-channel edge feathering pass (2D spatial neighborhood anti-aliasing)
      if (edgeSoftness > 0) {
        for (let y = 1; y < height - 1; y++) {
          const rowOffset = y * width;
          for (let x = 1; x < width - 1; x++) {
            const idx = rowOffset + x;
            const currentAlpha = alphaBuffer[idx];

            // Only smooth perimeter transitional pixels to preserve crisp interior solid graphics
            if (currentAlpha > 0 && currentAlpha < 255) {
              const smoothed = (
                alphaBuffer[idx - width - 1] + 2 * alphaBuffer[idx - width] + alphaBuffer[idx - width + 1] +
                2 * alphaBuffer[idx - 1] + 4 * currentAlpha + 2 * alphaBuffer[idx + 1] +
                alphaBuffer[idx + width - 1] + 2 * alphaBuffer[idx + width] + alphaBuffer[idx + width + 1]
              ) >> 4;
              data[idx * 4 + 3] = smoothed;
            } else {
              data[idx * 4 + 3] = currentAlpha;
            }
          }
        }

        // Direct border pixel copying
        for (let x = 0; x < width; x++) {
          data[x * 4 + 3] = alphaBuffer[x];
          data[((height - 1) * width + x) * 4 + 3] = alphaBuffer[(height - 1) * width + x];
        }
        for (let y = 0; y < height; y++) {
          data[(y * width) * 4 + 3] = alphaBuffer[y * width];
          data[(y * width + (width - 1)) * 4 + 3] = alphaBuffer[y * width + (width - 1)];
        }
      } else {
        for (let i = 0; i < totalPixels; i++) {
          data[i * 4 + 3] = alphaBuffer[i];
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const transparentPng = canvas.toDataURL('image/png');
      setResultSrc(transparentPng);
      setResultMeta({ size: Math.round(transparentPng.length * 0.75), width, height });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Run Resize
  const handleResize = () => {
    if (!imageSrc) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = resizeWidth;
      canvas.height = resizeHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, resizeWidth, resizeHeight);

      const resized = canvas.toDataURL('image/png');
      setResultSrc(resized);
      setResultMeta({ size: Math.round(resized.length * 0.75), width: resizeWidth, height: resizeHeight });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Run Crop
  const handleCrop = () => {
    if (!imageSrc) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let targetW = img.width;
      let targetH = img.height;
      let startX = 0;
      let startY = 0;

      if (cropAspect === '1:1') {
        const side = Math.min(img.width, img.height);
        targetW = side;
        targetH = side;
        startX = (img.width - side) / 2;
        startY = (img.height - side) / 2;
      } else if (cropAspect === '16:9') {
        if (img.width / img.height > 16 / 9) {
          targetH = img.height;
          targetW = Math.round(img.height * (16 / 9));
          startX = (img.width - targetW) / 2;
        } else {
          targetW = img.width;
          targetH = Math.round(img.width * (9 / 16));
          startY = (img.height - targetH) / 2;
        }
      } else if (cropAspect === '4:3') {
        if (img.width / img.height > 4 / 3) {
          targetH = img.height;
          targetW = Math.round(img.height * (4 / 3));
          startX = (img.width - targetW) / 2;
        } else {
          targetW = img.width;
          targetH = Math.round(img.width * (3 / 4));
          startY = (img.height - targetH) / 2;
        }
      }

      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, startX, startY, targetW, targetH, 0, 0, targetW, targetH);

      const cropped = canvas.toDataURL('image/png');
      setResultSrc(cropped);
      setResultMeta({ size: Math.round(cropped.length * 0.75), width: targetW, height: targetH });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Run Watermark
  const handleWatermark = () => {
    if (!imageSrc) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      ctx.save();
      ctx.globalAlpha = watermarkOpacity;
      ctx.fillStyle = watermarkColor;
      const fontSize = Math.max(16, Math.round(img.width / 22));
      ctx.font = `bold ${fontSize}px sans-serif`;

      if (watermarkPos === 'diagonal') {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 5);
        ctx.textAlign = 'center';
        ctx.fillText(watermarkText, 0, 0);
      } else if (watermarkPos === 'center') {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);
      } else {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(watermarkText, canvas.width - 20, canvas.height - 20);
      }
      ctx.restore();

      const watermarked = canvas.toDataURL('image/png');
      setResultSrc(watermarked);
      setResultMeta({ size: Math.round(watermarked.length * 0.75), width: canvas.width, height: canvas.height });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Run SVG to Raster
  const handleSvgToRaster = () => {
    setProcessing(true);
    const blob = new Blob([svgInput], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = (img.width || 300) * svgScale;
      canvas.height = (img.height || 300) * svgScale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      const raster = canvas.toDataURL('image/png');
      setResultSrc(raster);
      setResultMeta({ size: Math.round(raster.length * 0.75), width: canvas.width, height: canvas.height });
      setProcessing(false);
    };
    img.src = url;
  };

  // Run Metadata Remover (EXIF strip)
  const handleStripMetadata = () => {
    if (!imageSrc) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      // Clean canvas render strips all EXIF, GPS, camera metadata completely
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const stripped = canvas.toDataURL('image/jpeg', 0.95);
      setResultSrc(stripped);
      setMetadataStripped(true);
      setResultMeta({ size: Math.round(stripped.length * 0.75), width: img.width, height: img.height });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Run Image Filters
  const handleApplyFilters = () => {
    if (!imageSrc) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.filter = `blur(${filterBlur}px) brightness(${filterBrightness}%) contrast(${filterContrast}%) grayscale(${filterGrayscale}%) invert(${filterInvert}%)`;
      ctx.drawImage(img, 0, 0);

      const filtered = canvas.toDataURL('image/png');
      setResultSrc(filtered);
      setResultMeta({ size: Math.round(filtered.length * 0.75), width: img.width, height: img.height });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Run Meme Generator
  const handleGenerateMeme = () => {
    if (!imageSrc) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(3, Math.round(memeFontSize / 7));
      ctx.font = `900 ${memeFontSize}px Impact, sans-serif`;

      if (memeTop) {
        ctx.textBaseline = 'top';
        ctx.strokeText(memeTop.toUpperCase(), canvas.width / 2, 20);
        ctx.fillText(memeTop.toUpperCase(), canvas.width / 2, 20);
      }

      if (memeBottom) {
        ctx.textBaseline = 'bottom';
        ctx.strokeText(memeBottom.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.fillText(memeBottom.toUpperCase(), canvas.width / 2, canvas.height - 20);
      }

      const meme = canvas.toDataURL('image/png');
      setResultSrc(meme);
      setResultMeta({ size: Math.round(meme.length * 0.75), width: canvas.width, height: canvas.height });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Run QR Code Generator
  const handleGenerateQr = async () => {
    setProcessing(true);
    try {
      const url = await QRCode.toDataURL(qrText, {
        width: qrSize,
        margin: 2,
        color: {
          dark: qrDarkColor,
          light: qrLightColor,
        },
      });
      setResultSrc(url);
      setResultMeta({ size: Math.round(url.length * 0.75), width: qrSize, height: qrSize });
    } catch (e) {
      console.error(e);
    }
    setProcessing(false);
  };

  // Run Favicon Package Generator
  const handleGenerateFavicons = () => {
    if (!imageSrc) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 180;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 180, 180);
      const icon = canvas.toDataURL('image/png');
      setResultSrc(icon);
      setResultMeta({ size: Math.round(icon.length * 0.75), width: 180, height: 180 });
      setProcessing(false);
    };
    img.src = imageSrc;
  };

  // Copy helper
  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format bytes helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Tool header banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Image Processing Studio
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
              100% Client-Side
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{tool.name}</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">{tool.description}</p>
        </div>

        {/* Global Reset */}
        {imageSrc && (
          <button
            onClick={() => {
              setImageSrc(null);
              setImageFile(null);
              setImageMeta(null);
              setResultSrc(null);
              setResultMeta(null);
              setMetadataStripped(false);
            }}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors self-start sm:self-auto"
          >
            Clear / Upload New
          </button>
        )}
      </div>

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* File Upload Area (if tool needs an image and none uploaded, except for QR or SVG) */}
          {tool.id !== 'qr-generator' && tool.id !== 'svg-to-raster' && !imageSrc && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-900/40 hover:bg-slate-900/80 flex flex-col items-center justify-center min-h-[220px]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-200">
                Click to browse or drop image here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, WebP, SVG, GIF up to 50MB (Processed in-memory)
              </p>
            </div>
          )}

          {/* Specific Tool Controllers */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            {/* 1. Image Compressor */}
            {tool.id === 'image-compressor' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Compression Settings
                </h4>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Quality Level:</span>
                    <span className="font-mono font-semibold text-blue-400">{compressionQuality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="95"
                    value={compressionQuality}
                    onChange={(e) => setCompressionQuality(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>High Compression (Smaller)</span>
                    <span>High Fidelity (Larger)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1.5">Output Format:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['image/jpeg', 'image/webp', 'image/png'] as const).map(fmt => (
                      <button
                        key={fmt}
                        onClick={() => setCompressFormat(fmt)}
                        className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                          compressFormat === fmt
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {fmt.split('/')[1].toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={!imageSrc || processing}
                  onClick={handleCompress}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors shadow-lg shadow-blue-600/20"
                >
                  {processing ? 'Compressing...' : 'Compress Image Now'}
                </button>
              </>
            )}

            {/* 2. Format Converter */}
            {tool.id === 'image-converter' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Format Selection
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {(['image/png', 'image/jpeg', 'image/webp'] as const).map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setTargetFormat(fmt)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                        targetFormat === fmt
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {fmt.split('/')[1].toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!imageSrc || processing}
                  onClick={handleConvertFormat}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Converting...' : 'Convert Format'}
                </button>
              </>
            )}

            {/* 3. Background Remover */}
            {tool.id === 'background-remover' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Edge & Chroma Parameters
                </h4>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Color Tolerance:</span>
                    <span className="font-mono text-blue-400">{bgTolerance}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={bgTolerance}
                    onChange={(e) => setBgTolerance(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Edge Feathering:</span>
                    <span className="font-mono text-blue-400">{edgeSoftness}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={edgeSoftness}
                    onChange={(e) => setEdgeSoftness(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <button
                  disabled={!imageSrc || processing}
                  onClick={handleRemoveBackground}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Removing Background...' : 'Erase Background to Alpha PNG'}
                </button>
              </>
            )}

            {/* 4. Image Resizer */}
            {tool.id === 'image-resizer' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Dimensions
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Width (px)</label>
                    <input
                      type="number"
                      value={resizeWidth}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setResizeWidth(val);
                        if (maintainAspect && imageMeta) {
                          setResizeHeight(Math.round((val / imageMeta.width) * imageMeta.height));
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Height (px)</label>
                    <input
                      type="number"
                      value={resizeHeight}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setResizeHeight(val);
                        if (maintainAspect && imageMeta) {
                          setResizeWidth(Math.round((val / imageMeta.height) * imageMeta.width));
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintainAspect}
                    onChange={(e) => setMaintainAspect(e.target.checked)}
                    className="rounded accent-blue-500"
                  />
                  <span>Lock Aspect Ratio</span>
                </label>
                <button
                  disabled={!imageSrc || processing}
                  onClick={handleResize}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
                >
                  Resize Image
                </button>
              </>
            )}

            {/* 5. Crop Tool */}
            {tool.id === 'crop-tool' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Crop Aspect Ratio
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {(['1:1', '16:9', '4:3'] as const).map(ratio => (
                    <button
                      key={ratio}
                      onClick={() => setCropAspect(ratio)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                        cropAspect === ratio
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!imageSrc || processing}
                  onClick={handleCrop}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
                >
                  Apply Crop
                </button>
              </>
            )}

            {/* 6. Watermark Generator */}
            {tool.id === 'watermark-generator' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Watermark Config
                </h4>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Watermark Text</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['diagonal', 'center', 'bottom-right'] as const).map(pos => (
                    <button
                      key={pos}
                      onClick={() => setWatermarkPos(pos)}
                      className={`py-1.5 text-[11px] capitalize rounded border ${
                        watermarkPos === pos
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {pos.replace('-', ' ')}
                    </button>
                  ))}
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Opacity:</span>
                    <span className="font-mono text-blue-400">{Math.round(watermarkOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <button
                  disabled={!imageSrc || processing}
                  onClick={handleWatermark}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
                >
                  Stamp Watermark
                </button>
              </>
            )}

            {/* 7. SVG to Raster */}
            {tool.id === 'svg-to-raster' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  SVG Markup & Scale
                </h4>
                <textarea
                  value={svgInput}
                  onChange={(e) => setSvgInput(e.target.value)}
                  rows={4}
                  className="w-full font-mono text-[11px] bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-blue-300"
                  placeholder="Paste <svg>...</svg> code here"
                />
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Export Scale:</span>
                  <div className="flex gap-2">
                    {[1, 2, 4, 8].map(scale => (
                      <button
                        key={scale}
                        onClick={() => setSvgScale(scale)}
                        className={`px-2.5 py-1 text-xs rounded border ${
                          svgScale === scale
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {scale}x
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleSvgToRaster}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Rasterize SVG to High-Res PNG
                </button>
              </>
            )}

            {/* 8. Palette Extractor */}
            {tool.id === 'palette-extractor' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Extracted Swatches
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {extractedPalette.map((hex, i) => (
                    <button
                      key={i}
                      onClick={() => copyText(hex)}
                      className="group flex flex-col items-center p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600"
                    >
                      <div
                        className="w-full h-8 rounded mb-1.5 shadow-inner"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[10px] font-mono text-slate-300 group-hover:text-blue-400">
                        {hex}
                      </span>
                    </button>
                  ))}
                </div>
                {copied && (
                  <p className="text-xs text-emerald-400 text-center font-medium">
                    HEX copied to clipboard!
                  </p>
                )}
              </>
            )}

            {/* 9. Metadata Remover */}
            {tool.id === 'metadata-remover' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Privacy Cleaner
                </h4>
                <p className="text-xs text-slate-400">
                  Removes GPS coordinates, camera brand, date taken, and device software metadata.
                </p>
                <button
                  disabled={!imageSrc || processing}
                  onClick={handleStripMetadata}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 transition-colors"
                >
                  Strip All EXIF Metadata
                </button>
                {metadataStripped && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>EXIF data completely purged. Ready to download!</span>
                  </div>
                )}
              </>
            )}

            {/* 10. Image Filters */}
            {tool.id === 'image-filters' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Canvas Filters
                </h4>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Blur: {filterBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={filterBlur}
                    onChange={(e) => setFilterBlur(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Brightness: {filterBrightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={filterBrightness}
                    onChange={(e) => setFilterBrightness(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Contrast: {filterContrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={filterContrast}
                    onChange={(e) => setFilterContrast(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <button
                  disabled={!imageSrc || processing}
                  onClick={handleApplyFilters}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
                >
                  Apply Effects
                </button>
              </>
            )}

            {/* 11. Meme Generator */}
            {tool.id === 'meme-generator' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Meme Captions
                </h4>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Top Text</label>
                  <input
                    type="text"
                    value={memeTop}
                    onChange={(e) => setMemeTop(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Bottom Text</label>
                  <input
                    type="text"
                    value={memeBottom}
                    onChange={(e) => setMemeBottom(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase"
                  />
                </div>
                <button
                  disabled={!imageSrc || processing}
                  onClick={handleGenerateMeme}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
                >
                  Render Meme
                </button>
              </>
            )}

            {/* 12. GIF Converter */}
            {tool.id === 'gif-converter' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  GIF Frame Extraction
                </h4>
                <p className="text-xs text-slate-400">
                  Extracts still frames from GIFs with preserved transparency and full resolution.
                </p>
                <button
                  disabled={!imageSrc}
                  onClick={() => {
                    setResultSrc(imageSrc);
                    setResultMeta({ size: imageMeta?.size || 0 });
                  }}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Extract Frame as PNG
                </button>
              </>
            )}

            {/* 13. QR Code Generator */}
            {tool.id === 'qr-generator' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  QR Payload & Colors
                </h4>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Content / URL</label>
                  <input
                    type="text"
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Code Color</label>
                    <input
                      type="color"
                      value={qrDarkColor}
                      onChange={(e) => setQrDarkColor(e.target.value)}
                      className="w-full h-8 bg-transparent cursor-pointer rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Background</label>
                    <input
                      type="color"
                      value={qrLightColor}
                      onChange={(e) => setQrLightColor(e.target.value)}
                      className="w-full h-8 bg-transparent cursor-pointer rounded"
                    />
                  </div>
                </div>
                <button
                  onClick={handleGenerateQr}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Generate QR Code
                </button>
              </>
            )}

            {/* 14. Favicon Generator */}
            {tool.id === 'favicon-generator' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Favicon Generator
                </h4>
                <p className="text-xs text-slate-400">
                  Generates crisp web & app icons: 16x16, 32x32, 180x180 (Apple Touch), and 512x512 PWA.
                </p>
                <button
                  disabled={!imageSrc}
                  onClick={handleGenerateFavicons}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Generate Favicon Set
                </button>
              </>
            )}

            {/* 15. Image to Base64 */}
            {tool.id === 'image-base64' && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Base64 Data URI
                </h4>
                {base64Output && (
                  <div>
                    <textarea
                      readOnly
                      value={base64Output}
                      rows={5}
                      className="w-full font-mono text-[10px] bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-300"
                    />
                    <button
                      onClick={() => copyText(base64Output)}
                      className="mt-2 w-full py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied Data URI!' : 'Copy Base64'}</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Preview & Output Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 min-h-[350px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300">
                  {resultSrc ? 'Output Result' : 'Original Preview'}
                </span>
                {resultMeta && imageMeta && (
                  <span className="text-xs text-emerald-400 font-medium">
                    {formatBytes(resultMeta.size)} ({Math.round(((imageMeta.size - resultMeta.size) / imageMeta.size) * 100)}% saved)
                  </span>
                )}
              </div>

              {/* Preview Window with transparent checkerboard background */}
              <div className="relative rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center min-h-[260px] max-h-[420px] bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950 p-4">
                {resultSrc ? (
                  <img
                    src={resultSrc}
                    alt="Processed result"
                    className="max-h-[380px] max-w-full object-contain rounded shadow-lg"
                  />
                ) : imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Source preview"
                    className="max-h-[380px] max-w-full object-contain rounded"
                  />
                ) : (
                  <div className="text-center text-slate-500 text-xs">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <span>Upload an image or generate preview</span>
                  </div>
                )}
              </div>
            </div>

            {/* Download Output Button */}
            {resultSrc && (
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  {resultMeta?.width && `${resultMeta.width} × ${resultMeta.height} px · `}
                  {resultMeta && formatBytes(resultMeta.size)}
                </div>
                <a
                  href={resultSrc}
                  download={`rstools-${tool.id}-${Date.now()}.png`}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Output File</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
