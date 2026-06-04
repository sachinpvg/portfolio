<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect post data
    $name = strip_tags(trim($_POST["name"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"] ?? ''));
    $message = trim($_POST["message"] ?? '');

    // Basic Validation
    if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Please fill all fields correctly."]);
        exit;
    }

    // Email Config
    $recipient = "pvgsachin2@gmail.com"; 
    $email_subject = "Portfolio Contact: $subject";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $email_headers = "From: $name <$email>";

    
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Thank you, $name! Your message has been recorded. (please wait for response)"]);

} else {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Invalid request methodology."]);
}
?>
