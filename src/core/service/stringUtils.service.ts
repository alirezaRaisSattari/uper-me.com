export function uniqueNumbers(str: string) {
    return str
        .replace('۰', '0')
        .replace('۱', '1')
        .replace('۲', '2')
        .replace('۳', '3')
        .replace('۴', '4')
        .replace('۵', '5')
        .replace('۶', '6')
        .replace('۷', '7')
        .replace('۸', '8')
        .replace('۹', '9')
        .replace('٠', '0')
        .replace('١', '1')
        .replace('٢', '2')
        .replace('٣', '3')
        .replace('٤', '4')
        .replace('٥', '5')
        .replace('٦', '6')
        .replace('٧', '7')
        .replace('٨', '8')
        .replace('٩', '9');
}

export function uniqueLetters(str: string) {
    return str
        .replace('ﮎ', 'ک')
        .replace('ﮏ', 'ک')
        .replace('ﮐ', 'ک')
        .replace('ﮑ', 'ک')
        .replace('ك', 'ک')
        .replace('ي', 'ی')
        .replace('ئ', 'ی')
        .replace('یٰ', 'ی')
        .replace(' ّ', ' ')
        .replace(' ٌ', '')
        .replace(' ٍ', '')
        .replace(' ً', '')
        .replace(' ُ', '')
        .replace(' ِ', '')
        .replace(' ', ' ')
        .replace('ـ', '_')
        .replace('ؤ', 'و')
        .replace('إ', 'ا')
        .replace('آ', 'ا')
        .replace('ٱ', 'ا')
        .replace('أ', 'ا')
        .replace('ھ', 'ه')
        .replace('ۀ', 'ه')
        .replace('هٔ', 'ه')
        .replace('ه‍', 'ه')
        .replace('ة', 'ه');
}

export function uniqueString(str: string) {
    return uniqueNumbers(uniqueLetters(str));
}
