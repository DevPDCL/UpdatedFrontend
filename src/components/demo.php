
<?php
session_start();
include("../includes/db.php");
if (!isset($_SESSION['PHONE'])) {
    echo "<script>window.open('../masteradmin/index.php','_self')</script>";
    exit();
}

$admin_session = $_SESSION['PHONE'];
$get_admin = "SELECT * FROM masteradmin WHERE PHONE='$admin_session'";
$run_admin = mysqli_query($con, $get_admin);
$row_admin = mysqli_fetch_array($run_admin);

$PHONE = $row_admin['PHONE'];
$USER = $row_admin['USER'];
$EMAIL = $row_admin['EMAIL'];
$PHOTO = $row_admin['PHOTO'];
?>
<?php
if (isset($_POST['update_photo'])) {
    $newPhoto = $_FILES['new_photo']['name'];
    $tempPhoto = $_FILES['new_photo']['tmp_name'];
    move_uploaded_file($tempPhoto, "../uploads/" . $newPhoto);
    $update = "UPDATE masteradmin SET PHOTO='$newPhoto' WHERE PHONE='$PHONE'";
    mysqli_query($con, $update);
    echo "<script>alert('Photo Updated!'); window.location.reload();</script>";
}

if (isset($_POST['update_password'])) {
    $old = mysqli_real_escape_string($con, $_POST['old_password']);
    $new = mysqli_real_escape_string($con, $_POST['new_password']);
    $confirm = mysqli_real_escape_string($con, $_POST['confirm_password']);

    $getPwd = mysqli_fetch_array(mysqli_query($con, "SELECT PWD FROM masteradmin WHERE PHONE='$PHONE'"));
    if ($getPwd['PWD'] !== $old) {
        echo "<script>alert('Old password incorrect!');</script>";
    } elseif ($new !== $confirm) {
        echo "<script>alert('New passwords do not match!');</script>";
    } else {
        mysqli_query($con, "UPDATE masteradmin SET PWD='$new' WHERE PHONE='$PHONE'");
        echo "<script>alert('Password Updated!');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PDCL Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    body.dark-mode {
      background-color: #121212;
      color: #ffffff;
    }
    .navbar-custom {
      background-color: #28a745;
      color: white;
      position: fixed;
      width: 100%;
      z-index: 1050;
    }
    .sidebar {
      height: 100vh;
      width: 250px;
      position: fixed;
      top: 0;
      left: -250px;
      background: linear-gradient(180deg, #28a745, #218838);
      color: #fff;
      transition: all 0.3s ease;
      padding-top: 60px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .sidebar.active {
      left: 0;
    }
    .sidebar .nav-links {
      flex-grow: 1;
    }
    .sidebar a {
      color: #d4edda;
      text-decoration: none;
      padding: 14px 20px;
      display: block;
      transition: all 0.2s ease;
    }
    .sidebar a:hover, .sidebar a.active {
      background-color: #1e7e34;
      color: #ffffff;
    }
    .sidebar-footer {
      padding: 15px 20px;
      font-size: 0.9rem;
      background-color: #1e7e34;
      text-align: center;
      color: #c3e6cb;
    }
    .content {
      margin-left: 0;
      transition: margin-left 0.3s ease;
      padding: 60px 20px 20px;
    }
    .content.shifted {
      margin-left: 250px;
    }
    .profile-img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
    @media (max-width: 768px) {
      .sidebar {
        width: 200px;
      }
      .content.shifted {
        margin-left: 200px;
      }
    }
    .notification-badge {
      position: absolute;
      top: 8px;
      right: 6px;
      padding: 4px 6px;
      border-radius: 50%;
      background: red;
      color: white;
      font-size: 0.7rem;
    }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-custom px-3">
    <button class="sidebar-toggler me-3" id="sidebarToggle">
      <i class="bi bi-list text-white"></i>
    </button>
    <a class="navbar-brand text-white fw-bold" href="#">PDCL</a>
    <div class="ms-auto d-flex align-items-center gap-3">
      <div class="position-relative">
        <i class="bi bi-bell text-white fs-5"></i>
       <!-- <span class="notification-badge">3</span>  -->
      </div>
      <button id="darkModeToggle" class="btn btn-sm btn-light">🌙</button>
      <div class="dropdown">
        <a class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <span><?php echo htmlspecialchars($USER); ?></span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i> Profile</a></li>
          <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#changePhotoModal"><i class="bi bi-pencil-square me-2"></i> Change Photo</a></li>
          <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#changePasswordModal"><i class="bi bi-key me-2"></i> Change Password</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="../logout.php"><i class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="sidebar" id="sidebar">
    <a href="home.php" class="block px-4 py-2 text-gray-700 rounded hover:bg-gray-200">Dashboard</a>

      <!-- Users Dropdown -->
      <div class="relative">
        <button id="users-btn" class="w-full flex justify-between items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200">
          Users
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="users-menu" class="hidden mt-1 ml-4 bg-white shadow rounded w-48 absolute z-10">
          <a href="viewuser.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Users</a>
          <a href="adduser.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add User</a>
        </div>
      </div>

      <!-- Department Dropdown -->
      <div class="relative">
        <button id="settings-btn" class="w-full flex justify-between items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200">
          Department
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="settings-menu" class="hidden mt-1 ml-4 bg-white shadow rounded w-48 absolute z-10">
          <a href="viewdepartment.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Departments</a>
          <a href="adddepartment.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Department</a>
        </div>
      </div>

      <!-- Branch Dropdown -->
      <div class="relative">
        <button id="reports-btn" class="w-full flex justify-between items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200">
          Branches
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="reports-menu" class="hidden mt-1 ml-4 bg-white shadow rounded w-48 absolute z-10">
          <a href="viewbranch.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Branches</a>
          <a href="addbranch.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Branch</a>
        </div>
      </div>
         <div class="relative">
    <button id="report-btn" class="w-full flex justify-between items-center px-4 py-2 text-gray-700 rounded hover:bg-gray-200">
      Designations
      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div id="report-menu" class="hidden mt-1 ml-4 bg-white shadow rounded w-48 z-10 absolute">
      <a href="viewdesign.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Designations</a>
      <a href="adddesign.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Designation</a>
    </div>
  </div>
    <div class="sidebar-footer">
      © 2025 MyCompany
    </div>
  </div>

  <div class="content" id="mainContent">
    <div class="container">
        
     
     
     
     
     
      
      
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('mainContent');
    const darkModeToggle = document.getElementById('darkModeToggle');

    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      content.classList.toggle('shifted');
    });

    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  </script>

<!-- Change Photo Modal -->
<div class="modal fade" id="changePhotoModal" tabindex="-1" aria-labelledby="changePhotoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form class="modal-content" method="POST" enctype="multipart/form-data">
      <div class="modal-header">
        <h5 class="modal-title" id="changePhotoModalLabel">Change Profile Photo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="file" class="form-control" name="new_photo" accept="image/*" required>
      </div>
      <div class="modal-footer">
        <button type="submit" name="update_photo" class="btn btn-success">Upload</button>
      </div>
    </form>
  </div>
</div>

<!-- Change Password Modal -->
<div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form class="modal-content" method="POST">
      <div class="modal-header">
        <h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="password" name="old_password" class="form-control mb-2" placeholder="Old Password" required>
        <input type="password" name="new_password" class="form-control mb-2" placeholder="New Password" required>
        <input type="password" name="confirm_password" class="form-control" placeholder="Confirm Password" required>
      </div>
      <div class="modal-footer">
        <button type="submit" name="update_password" class="btn btn-primary">Change</button>
      </div>
    </form>
  </div>
</div>

</body>
</html>
