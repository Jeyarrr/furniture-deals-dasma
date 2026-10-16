# Product photo import

44 original product photos are retained alongside the original hero in the local archive/original-photos.zip backup, excluded from deployment and Git. Keep a separate backup of this archive. Names without printed model names are descriptive labels. Only Monaco (PHP 23,500) and Lexumburg (PHP 26,500) have legible prices for the featured furniture. Other visible background price cards do not identify the featured product and were not used. Photo prices and specifications require showroom confirmation.

Edits use the built-in image generation tool in edit mode. Cleaned JPEGs are stored in public/images/products. AI cleanup reconstructs areas covered by advertising; originals remain the source of truth.

## Base prompt

Edit target: the supplied furniture photograph. Remove all superimposed advertising, logos, watermarks, Facebook URLs, promotional text and price placards. Reconstruct the underlying surfaces naturally. Strictly preserve the exact furniture design, proportions, upholstery colors, seams, cushions, legs, arrangement, camera angle, lighting and room background. Do not add or remove furniture or change product details. Return only the cleaned photograph, same framing, no text.

For remaining photos: Remove camera watermarks too. Preserve decorative patterns physically part of the furniture. Remove physical sale signs and hanging advertising pennants if present, retaining other room objects.

For Monaco and Lexumburg posters: Remove all orange graphic panels, badges, buttons and typography, isolate the exact depicted sofa and matching ottoman if present against a plain warm off-white studio background and floor with natural shadows. Preserve every product detail and its original arrangement.

Bunk-bed correction prompt: Remove only the overlaid store logos, Facebook URL and phone advertisement. Preserve the decorative rectangular panel physically attached to the upper front bed rail, its border, laurel wreath and lettering. Preserve all furniture geometry and room details.
