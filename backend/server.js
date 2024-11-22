const express = require('express');
const cors = require('cors'); 

const app = express();

app.use(cors());

app.use(express.json());

const isPrime = (num) => {
    num = parseInt(num);
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const handelPost = async (req, res) => {
    try {
        const { data, file_b64 } = req.body;
        
        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input format"
            });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);
        
        const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
        const highest_lowercase_alphabet = lowercaseAlphabets.length > 0 
            ? [lowercaseAlphabets.reduce((a, b) => a > b ? a : b)]
            : [];

        const is_prime_found = numbers.some(num => isPrime(num));

        let fileInfo = {
            file_valid: false
        };

        if (file_b64) {
            try {
                const buffer = Buffer.from(file_b64, 'base64');
                const fileSize = Math.ceil(buffer.length / 1024);

                const mimeType = file_b64.startsWith('/9j/') ? 'image/jpeg'
                    : file_b64.startsWith('iVBOR') ? 'image/png'
                    : file_b64.startsWith('JVBERi0') ? 'application/pdf'
                    : 'application/octet-stream';

                fileInfo = {
                    file_valid: true,
                    file_mime_type: mimeType,
                    file_size_kb: fileSize.toString()
                };
            } catch (error) {
                fileInfo.file_valid = false;
            }
        }

        const response = {
            is_success: true,
            user_id: "harsh_doiphode_15112000",
            email: "harshdoiphode1308@gmail.com",
            roll_number: "0101CS211049",
            numbers,
            alphabets,
            highest_lowercase_alphabet,
            is_prime_found,
            ...fileInfo
        };

        return res.json(response);

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
}

const handelGet = async (req, res) => {
    return res.status(200).json({
        
            "operation_code":1
            
    });
  };

  

app.get('/bfhl', handelGet);
app.post('/bfhl', handelPost);
// Start server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
