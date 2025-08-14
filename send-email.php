<?php
// Contact Form Handler for Yoichi Designer Portfolio
// This file handles the contact form submission and sends emails

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Set recipient email (your email)
    $to = "yoichidesigner@gmail.com";
    
    // Set email subject
    $email_subject = "New Contact Form Message: " . $subject;
    
    // Build email content
    $email_body = "You have received a new message from your portfolio website.\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Subject: " . $subject . "\n\n";
    $email_body .= "Message:\n" . $message . "\n\n";
    $email_body .= "This message was sent from your portfolio contact form.";
    
    // Set email headers
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success - redirect back to the form with success message
        header("Location: index.html?success=true");
        exit;
    } else {
        // Error - redirect back to the form with error message
        header("Location: index.html?error=true");
        exit;
    }
    
} else {
    // If someone tries to access this file directly, redirect to home
    header("Location: index.html");
    exit;
}
?>
