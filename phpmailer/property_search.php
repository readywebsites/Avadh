<?php
// Property Search Handler - Real Estate Property Finder
// This file processes property search form submissions

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set JSON response header
header('Content-Type: application/json; charset=utf-8');

// Get form data
$location = isset($_POST['location']) ? trim($_POST['location']) : '';
$property_type = isset($_POST['property_type']) ? trim($_POST['property_type']) : '';
$price_range = isset($_POST['price_range']) ? trim($_POST['price_range']) : '';
$bedrooms = isset($_POST['bedrooms']) ? trim($_POST['bedrooms']) : '';

// Initialize error array
$errors = array();

// Validate form fields
if (empty($location)) {
    $errors[] = 'Location / City is required.';
}

if (empty($property_type) || $property_type === 'Residential|Commercial|Land|Industrial') {
    $errors[] = 'Please select a property type.';
}

if (empty($price_range) || $price_range === '₹0-25-lakhs|₹25-50-lakhs|₹50-100-lakhs|₹1-5-crores|₹5-crores-plus') {
    $errors[] = 'Please select a price range.';
}

if (empty($bedrooms) || $bedrooms === 'Studio|1|2|3|4+') {
    $errors[] = 'Please select number of bedrooms.';
}

// If there are validation errors, return them
if (!empty($errors)) {
    $error_message = implode('<br>', $errors);
    echo '<div class="error_message">' . htmlspecialchars($error_message) . '</div>';
    exit;
}

// Sanitize input data
$location = htmlspecialchars($location);
$property_type = htmlspecialchars($property_type);
$price_range = htmlspecialchars($price_range);
$bedrooms = htmlspecialchars($bedrooms);

// Log search query (optional - for analytics)
$search_log = date('Y-m-d H:i:s') . ' - Location: ' . $location . ' | Type: ' . $property_type . ' | Price: ' . $price_range . ' | Bedrooms: ' . $bedrooms . "\n";
$log_file = __DIR__ . '/property_searches.log';
if (is_writable(__DIR__)) {
    file_put_contents($log_file, $search_log, FILE_APPEND);
}

// Prepare success message with search details
$success_message = '<div class="success_message">';
$success_message .= '<p style="margin: 0; font-weight: bold;">Property Search Initiated!</p>';
$success_message .= '<p style="margin: 8px 0 0 0; font-size: 0.9rem;">Searching for properties in <strong>' . $location . '</strong></p>';
$success_message .= '<p style="margin: 4px 0 0 0; font-size: 0.9rem;">Type: <strong>' . $property_type . '</strong> | Price: <strong>' . $price_range . '</strong> | Bedrooms: <strong>' . $bedrooms . '</strong></p>';
$success_message .= '</div>';

// Try to send email notification to admin
try {
    // Include PHPMailer library
    require 'src/Exception.php';
    require 'src/PHPMailer.php';
    require 'src/SMTP.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Gmail SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'your-email@gmail.com'; // Replace with your Gmail address
    $mail->Password = 'your-app-password'; // Replace with Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('noreply@realestate.com', 'Real Estate Search');
    $mail->addAddress('admin@realestate.com', 'Admin');

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Property Search - ' . $location;

    $email_body = '
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px; }
            .header { background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%); padding: 20px; text-align: center; color: #1a1f3a; }
            .content { background: white; padding: 20px; }
            .field { margin: 15px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #d4af37; }
            .value { color: #333; margin-top: 5px; }
            .footer { text-align: center; padding: 15px; color: #999; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Property Search Inquiry</h2>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">Location / City:</div>
                    <div class="value">' . $location . '</div>
                </div>
                <div class="field">
                    <div class="label">Property Type:</div>
                    <div class="value">' . $property_type . '</div>
                </div>
                <div class="field">
                    <div class="label">Price Range:</div>
                    <div class="value">' . $price_range . '</div>
                </div>
                <div class="field">
                    <div class="label">Bedrooms:</div>
                    <div class="value">' . $bedrooms . '</div>
                </div>
                <div class="field">
                    <div class="label">Search Date & Time:</div>
                    <div class="value">' . date('M d, Y h:i A') . '</div>
                </div>
                <div class="field">
                    <div class="label">IP Address:</div>
                    <div class="value">' . $_SERVER['REMOTE_ADDR'] . '</div>
                </div>
            </div>
            <div class="footer">
                <p>This is an automated notification from your Real Estate Search system.</p>
            </div>
        </div>
    </body>
    </html>
    ';

    $mail->Body = $email_body;
    $mail->AltBody = 'Location: ' . $location . ' | Type: ' . $property_type . ' | Price: ' . $price_range . ' | Bedrooms: ' . $bedrooms;

    $mail->send();
    
} catch (Exception $e) {
    // Email sending failed, but still show success to user
    // Log the error for debugging
    error_log('PHPMailer Error: ' . $e->getMessage());
}

// Return success message
echo $success_message;
?>
