// Unlock, Lock

function lock() {
    const chooseUnLock = document.querySelectorAll('.check .unlock');

    chooseUnLock.forEach(unlock => {
        unlock.onclick = function() {
            var lock = this.closest('.check').querySelector('.lock');
            document.querySelector('.check .unlock.main').classList.remove('main');
            this.classList.add('main');
            this.style.display = 'none';
            lock.style.display = 'block';
        }
    })
}

function unlock() {
    const chooseLock = document.querySelectorAll('.check .lock');

    chooseLock.forEach(lock => {
        lock.onclick = function() {
            var unlock = this.closest('.check').querySelector('.unlock');
            document.querySelector('.check .lock.main').classList.remove('main');
            this.classList.add('main');
            this.style.display = 'none';
            unlock.style.display = 'block';
        }
    })
}

// LockAll

function lockAll() {
    // Lấy tất cả icon unlock
    const unlockall = document.querySelectorAll('.unlock');

    // Lấy tất cả icon lock
    const lockall = document.querySelectorAll('.lock')
    // Ẩn tất cả icon unlock
    unlockall.forEach(lock => {
        lock.style.display = 'none';
    })
    // Hiện tất cả icon lock
    lockall.forEach(unlock => {
        unlock.style.display ='block';
    })
}

// UnLockAll

function unLockAll() {
    const unlockall = document.querySelectorAll('.unlock');

    // Lấy tất cả icon lock
    const lockall = document.querySelectorAll('.lock')
    // Ẩn tất cả icon unlock
    unlockall.forEach(lock => {
        lock.style.display = 'block';
    })
    // Hiện tất cả icon lock
    lockall.forEach(unlock => {
        unlock.style.display ='none';
    })
}