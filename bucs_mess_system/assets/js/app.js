// assets/js/app.js – BUCS Messaging System

// ── Modal helpers ───────────────────────────────
function openModal(id) {

    var m = document.getElementById(id);

    if (!m) return;

    m.classList.add('open');

    document.body.style.overflow = 'hidden';

    var first = m.querySelector(
        'input:not([type=hidden]),select,textarea'
    );

    if (first) {
        setTimeout(function () {
            first.focus();
        }, 80);
    }
}

function closeModal(id) {

    var m = document.getElementById(id);

    if (!m) return;

    m.classList.remove('open');

    document.body.style.overflow = '';

    var f = m.querySelector('form');

    if (f) f.reset();
}

// ── Close modal on backdrop ─────────────────────
document.addEventListener('click', function (e) {

    if (e.target.classList.contains('modal-overlay')) {

        e.target.classList.remove('open');

        document.body.style.overflow = '';
    }
});

// ── Close modal on ESC ──────────────────────────
document.addEventListener('keydown', function (e) {

    if (e.key === 'Escape') {

        document
            .querySelectorAll('.modal-overlay.open')
            .forEach(function (m) {

                m.classList.remove('open');

                document.body.style.overflow = '';
            });
    }
});

// ── Navbar dropdown ─────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

    var navUser = document.querySelector('.nav-user');

    if (navUser) {

        navUser.addEventListener('click', function (e) {

            e.stopPropagation();

            navUser.classList.toggle('open');
        });

        document.addEventListener('click', function () {

            navUser.classList.remove('open');
        });
    }
});

// ── Auto dismiss alerts ─────────────────────────
document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.alert').forEach(function (el) {

        el.style.transition =
            'opacity .4s ease, transform .4s ease';

        setTimeout(function () {

            el.style.opacity = '0';

            el.style.transform = 'translateY(-6px)';

            setTimeout(function () {

                el.remove();

            }, 400);

        }, 4000);
    });
});

// ── Password & Confirm show / hide ──────────────
document.addEventListener('DOMContentLoaded', function () {
    function attachToggle(fieldId, toggleId) {
        var fld = document.getElementById(fieldId);
        var tog = document.getElementById(toggleId);
        if (!fld || !tog) return;
        tog.addEventListener('click', function () {
            if (fld.type === 'password') {
                fld.type = 'text';
                tog.textContent = '🙈';
            } else {
                fld.type = 'password';
                tog.textContent = '👁️';
            }
        });
    }

    attachToggle('password', 'showPassword');
    attachToggle('confirm_password', 'showConfirmPassword');
});

// ── Required field validation ───────────────────
document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('form').forEach(function (form) {

        form.addEventListener('submit', function (e) {

            var ok = true;

            form.querySelectorAll('[required]')
                .forEach(function (f) {

                    f.classList.remove('error');

                    if (!f.value.trim()) {

                        f.classList.add('error');

                        ok = false;
                    }
                });

            // Ensure confirm password logic: if confirm filled but new password empty, block submit
            var pwd = form.querySelector('input[name="pwd"], #password');
            var cpwd = form.querySelector('input[name="cpwd"], #confirm_password');
            if (cpwd && cpwd.value.trim() !== '' && (!pwd || pwd.value.trim() === '')) {
                cpwd.classList.add('error');
                ok = false;
                if (!form.querySelector('.pw-hint')) {
                    var hint = document.createElement('div');
                    hint.className = 'alert alert-error pw-hint';
                    hint.innerHTML = '<i class="fa fa-xmark"></i> Please enter your new password first.';
                    form.insertBefore(hint, form.firstChild);
                }
            }

            // Ensure confirm password matches new password when provided
            if (pwd && cpwd && pwd.value.trim() !== '') {
                if (pwd.value !== cpwd.value) {
                    pwd.classList.add('error');
                    cpwd.classList.add('error');
                    ok = false;
                    // insert an inline alert if not already present
                    if (!form.querySelector('.pw-match-error')) {
                        var err = document.createElement('div');
                        err.className = 'alert alert-error pw-match-error';
                        err.innerHTML = '<i class="fa fa-xmark"></i> Passwords do not match.';
                        form.insertBefore(err, form.firstChild);
                    }
                }
            }

            if (!ok) e.preventDefault();
        });

        form.querySelectorAll('[required]')
            .forEach(function (f) {

                f.addEventListener('input', function () {

                    f.classList.remove('error');
                });
            });

        // Show hint if user types confirm password before entering new password
        var pwdField = form.querySelector('input[name="pwd"], #password');
        var cpwdField = form.querySelector('input[name="cpwd"], #confirm_password');
        if (cpwdField) {
            cpwdField.addEventListener('input', function () {
                var existing = form.querySelector('.pw-hint');
                if (cpwdField.value.trim() !== '' && (!pwdField || pwdField.value.trim() === '')) {
                    if (!existing) {
                        var info = document.createElement('div');
                        info.className = 'alert alert-error pw-hint';
                        info.innerHTML = '<i class="fa fa-xmark"></i> Please enter your new password first.';
                        form.insertBefore(info, form.firstChild);
                    }
                } else {
                    if (existing) existing.remove();
                }
            });
        }

        if (pwdField) {
            pwdField.addEventListener('input', function () {
                var existing = form.querySelector('.pw-hint');
                if (existing) existing.remove();
            });
        }
    });
});