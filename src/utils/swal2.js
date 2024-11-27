import Swal from "sweetalert2";
import SelectOptions from "./selectOptions";
export const StartLoading = (msg) => {
    Swal.fire({
        title: msg,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });
}

export const CloseLoading = () => {
    Swal.close();
}

export const SuccessSwal = (title, text) => {
    Swal.fire({
        title,
        text,
        showConfirmButton: false,
        timer: 2000
    });
}

export const ErrorSwal = (msg) => {
    Swal.fire({
        title: msg,
        icon: "error",
        showConfirmButton: true,
        timer: 2000
    });
}

export const ConfirmationSwal = (confirmCb, cancelCb) => {
    Swal.fire({
        title: 'Apakah Anda Yakin?',
        text: 'Anda tidak akan dapat mengembalikan ini!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            confirmCb();
        } else if (result.isDismissed) {
            cancelCb()
        }
    });
}

export const ConfirmationSwal1 = (confirmCb, cancelCb) => {
    Swal.fire({
        title: 'Apakah Anda Yakin?',
        text: 'Anda tidak akan dapat mengembalikan ini!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: '<input type="file" id="fileInput">',
    }).then((result) => {
        if (result.isConfirmed) {
            confirmCb();
        } else if (result.isDismissed) {
            cancelCb()
        }
    });
}

export const InputSwal = async (title, placeholder, status, callback) => {
    const { value: formValues, isConfirmed } = await Swal.fire({
        title: title,
        icon: 'warning',
        html: `
            <div style="margin-bottom: 10px; display: flex; flex-direction: column;">
                <select id="swal-select" class="swal2-select" style="width: 85%;" onchange="showTextarea()">
                    <option value="Usul memenuhi persyaratan dan dikembalikan ke pengusul">Usul memenuhi persyaratan dan dikembalikan ke pengusul</option>
                    <option value="other">Lainnya</option>
                </select>
                <textarea id="swal-textarea" class="swal2-textarea" placeholder="${placeholder}" style="width: 85%; margin-top: 10px; display: none;"></textarea>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Batal',
        preConfirm: () => {
            const selectedOption = document.getElementById('swal-select').value;
            const textareaValue = document.getElementById('swal-textarea').value;
            return { selectedOption, textareaValue };
        },
        didOpen: () => {
            window.showTextarea = function () {
                const selectedOption = document.getElementById('swal-select').value;
                const textarea = document.getElementById('swal-textarea');
                if (selectedOption === 'other') {
                    textarea.style.display = 'block';
                } else {
                    textarea.style.display = 'none';
                }
            };
        }
    });

    if (isConfirmed && formValues) {
        const { selectedOption, textareaValue } = formValues;
        if (selectedOption === 'other') {
            if (typeof callback === 'function') {
                callback(textareaValue);
            }
        } else {
            if (typeof callback === 'function') {
                callback(selectedOption);
            }
        }
    }
};

export const InputSwal2 = async (title, placeholder, callback) => {
    const { value: formValues, isConfirmed } = await Swal.fire({
        title: title,
        icon: 'warning',
        html: `
      <div style="margin-bottom: 10px; display: flex; flex-direction: column;">
        <select id="swal-select" class="swal2-select" style="width: 85%;" onchange="showTextarea()">
          <option value="Usul memenuhi persyaratan dan dikembalikan ke pengusul">Usul memenuhi persyaratan dan dikembalikan ke pengusul</option>
          <option value="other">Lainnya</option>
        </select>
        <textarea id="swal-textarea" class="swal2-textarea" placeholder="${placeholder}" style="width: 85%; margin-top: 10px; display: none;"></textarea>
      </div>
    `,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Batal',
        preConfirm: () => {
            const selectedOption = document.getElementById('swal-select').value;
            const textareaValue = document.getElementById('swal-textarea').value;
            return selectedOption === 'other' ? textareaValue : selectedOption;
        },
        didOpen: () => {
            window.showTextarea = function () {
                const selectedOption = document.getElementById('swal-select').value;
                const textarea = document.getElementById('swal-textarea');
                textarea.style.display = selectedOption === 'other' ? 'block' : 'none';
            };
        }
    });

    if (isConfirmed && formValues) {
        if (typeof callback === 'function') {
            callback(formValues);
        }
    }
};

export const InputSwal3 = async (title, placeholder, callback) => {
    const { value: formValues, isConfirmed } = await Swal.fire({
        title: title,
        icon: 'warning',
        html: `
      <div style="margin-bottom: 10px; display: flex; flex-direction: column;">
        <select id="swal-select" class="swal2-select" style="width: 85%;" onchange="showTextarea()">
          <option value="Usul pembukaan prodi belum memenuhi persyaratan dan dikembalikan ke pengusul">Usul pembukaan prodi belum memenuhi persyaratan dan dikembalikan ke pengusul</option>
          <option value="Usulan dokumen dikembalikan">Usulan dokumen dikembalikan</option>
           <option value="Usul pembukaan prodi sudah memenuhi persyaratan dan dapat di proses ke tahap selanjutnya">Usul pembukaan prodi sudah memenuhi persyaratan dan dapat di proses ke tahap selanjutnya</option>
          <option value="Usulan dokumen lengkap">Usulan dokumen lengkap</option>
          <option value="other">Lainnya</option>
        </select>
        <textarea id="swal-textarea" class="swal2-textarea" placeholder="${placeholder}" style="width: 85%; margin-top: 10px; display: none;"></textarea>
      </div>
    `,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Batal',
        preConfirm: () => {
            const selectedOption = document.getElementById('swal-select').value;
            const textareaValue = document.getElementById('swal-textarea').value;
            return selectedOption === 'other' ? textareaValue : selectedOption;
        },
        didOpen: () => {
            window.showTextarea = function () {
                const selectedOption = document.getElementById('swal-select').value;
                const textarea = document.getElementById('swal-textarea');
                textarea.style.display = selectedOption === 'other' ? 'block' : 'none';
            };
        }
    });

    if (isConfirmed && formValues) {
        if (typeof callback === 'function') {
            callback(formValues);
        }
    }
};

export const InputSwal4 = async (title, placeholder, callback) => {
    const { value: formValues, isConfirmed } = await Swal.fire({
        title: title,
        icon: 'warning',
        html: `
            <div style="margin-bottom: 10px; display: flex; flex-direction: column;">
                <select id="swal-select" class="swal2-select" style="width: 85%;" onchange="showTextarea()">
                    <option value="">Pilih opsi memenuhi</option>
                    <option value="Telah memenuhi persyaratan dan dapat diproses ke tahap selanjutnya">Telah memenuhi persyaratan dan dapat diproses ke tahap selanjutnya</option>
                    <option value="other">Lainnya</option>
                </select>
                <textarea id="swal-textarea" class="swal2-textarea" placeholder="${placeholder}" style="display: none; margin-top: 10px;"></textarea>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Batal',
        preConfirm: () => {
            const selectedOption = document.getElementById('swal-select').value;
            const textareaValue = document.getElementById('swal-textarea').value;

            // Check if no option is selected
            if (!selectedOption) {
                Swal.showValidationMessage('Silakan pilih alasan penolakan');
                return false; // Prevent confirmation
            }

            // Return the appropriate value based on selection
            return selectedOption === 'other' ? textareaValue : selectedOption;
        },
        didOpen: () => {
            window.showTextarea = function () {
                const selectedOption = document.getElementById('swal-select').value;
                const textarea = document.getElementById('swal-textarea');
                textarea.style.display = selectedOption === 'other' ? 'block' : 'none';
            };
        }
    });

    if (isConfirmed && formValues) {
        if (typeof callback === 'function') {
            callback(formValues);
        }
    }
};






