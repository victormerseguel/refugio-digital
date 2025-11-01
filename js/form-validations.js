function initCadastroForm() {
  const form = document.querySelector("form");
  if (!form) return;

  const errorMsg = document.getElementById("error-msg");
  const successMsg = document.getElementById("success-msg");

  addInputMasks(form);

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    const newButton = submitButton.cloneNode(true);
    submitButton.parentNode.replaceChild(newButton, submitButton);

    newButton.addEventListener("click", function (e) {
      e.preventDefault();

      clearAllFieldStyles();

      handleFormSubmission(form, errorMsg, successMsg);
    });
  }

  addInputValidationListeners(form);

  function addInputMasks(form) {
    const telefoneInput = form.querySelector('input[name="telefone"]');
    const cepInput = form.querySelector('input[name="cep"]');
    const cpfInput = form.querySelector('input[name="cpf"]');

    if (telefoneInput) {
      telefoneInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length <= 11) {
          if (value.length === 0) {
            e.target.value = "";
          } else if (value.length <= 2) {
            e.target.value = "(" + value;
          } else if (value.length <= 6) {
            e.target.value =
              "(" + value.substring(0, 2) + ") " + value.substring(2);
          } else if (value.length <= 10) {
            e.target.value =
              "(" +
              value.substring(0, 2) +
              ") " +
              value.substring(2, 6) +
              "-" +
              value.substring(6);
          } else {
            e.target.value =
              "(" +
              value.substring(0, 2) +
              ") " +
              value.substring(2, 7) +
              "-" +
              value.substring(7, 11);
          }
        }
      });

      telefoneInput.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
          const value = e.target.value;
          if (
            value.length > 0 &&
            ["(", ")", " ", "-"].includes(value[value.length - 1])
          ) {
            e.target.value = value.substring(0, value.length - 1);
          }
        }
      });
    }

    if (cepInput) {
      cepInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length <= 8) {
          if (value.length <= 5) {
            e.target.value = value;
          } else {
            e.target.value =
              value.substring(0, 5) + "-" + value.substring(5, 8);
          }
        }
      });

      cepInput.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
          const value = e.target.value;
          if (value.length > 0 && value[value.length - 1] === "-") {
            e.target.value = value.substring(0, value.length - 1);
          }
        }
      });
    }

    if (cpfInput) {
      cpfInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length <= 11) {
          if (value.length <= 3) {
            e.target.value = value;
          } else if (value.length <= 6) {
            e.target.value = value.substring(0, 3) + "." + value.substring(3);
          } else if (value.length <= 9) {
            e.target.value =
              value.substring(0, 3) +
              "." +
              value.substring(3, 6) +
              "." +
              value.substring(6);
          } else {
            e.target.value =
              value.substring(0, 3) +
              "." +
              value.substring(3, 6) +
              "." +
              value.substring(6, 9) +
              "-" +
              value.substring(9, 11);
          }
        }
      });

      cpfInput.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
          const value = e.target.value;
          if (
            value.length > 0 &&
            [".", "-"].includes(value[value.length - 1])
          ) {
            e.target.value = value.substring(0, value.length - 1);
          }
        }
      });
    }
  }

  function handleFormSubmission(form, errorMsg, successMsg) {
    if (errorMsg) errorMsg.style.display = "none";
    if (successMsg) successMsg.style.display = "none";

    const telefoneOriginal = form.telefone.value;
    const cepOriginal = form.cep.value;
    const cpfOriginal = form.cpf.value;

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const cpf = form.cpf.value.trim();
    const telefone = form.telefone.value.trim();
    const nascimento = form.nascimento.value;
    const endereco = form.endereco.value.trim();
    const cep = form.cep.value.trim();
    const cidade = form.cidade.value.trim();
    const estado = form.estado.value;

    let isValid = true;

    if (!nome) {
      markFieldAsInvalid(form.nome, "Nome é obrigatório");
      isValid = false;
    }

    if (!email) {
      markFieldAsInvalid(form.email, "E-mail é obrigatório");
      isValid = false;
    }

    if (!cpf) {
      markFieldAsInvalid(form.cpf, "CPF é obrigatório");
      isValid = false;
    } else {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!cpfRegex.test(cpf)) {
        markFieldAsInvalid(
          form.cpf,
          "CPF inválido. Use o formato 000.000.000-00"
        );
        isValid = false;
      } else {
        markFieldAsValid(form.cpf);
      }
    }

    if (!telefone) {
      markFieldAsInvalid(form.telefone, "Telefone é obrigatório");
      isValid = false;
    } else {
      const telRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      if (!telRegex.test(telefone)) {
        markFieldAsInvalid(
          form.telefone,
          "Telefone inválido. Use o formato (00) 00000-0000"
        );
        isValid = false;
      } else {
        markFieldAsValid(form.telefone);
      }
    }

    if (!nascimento) {
      markFieldAsInvalid(form.nascimento, "Data de nascimento é obrigatória");
      isValid = false;
    }

    if (!endereco) {
      markFieldAsInvalid(form.endereco, "Endereço é obrigatório");
      isValid = false;
    }

    if (!cep) {
      markFieldAsInvalid(form.cep, "CEP é obrigatório");
      isValid = false;
    } else {
      const cepRegex = /^\d{5}-\d{3}$/;
      if (!cepRegex.test(cep)) {
        markFieldAsInvalid(form.cep, "CEP inválido. Use o formato 00000-000");
        isValid = false;
      } else {
        markFieldAsValid(form.cep);
      }
    }

    if (!cidade) {
      markFieldAsInvalid(form.cidade, "Cidade é obrigatória");
      isValid = false;
    }

    if (!estado) {
      markFieldAsInvalid(form.estado, "Estado é obrigatório");
      isValid = false;
    }

    // Validação de e-mail
    if (email && !isValidEmail(email)) {
      markFieldAsInvalid(form.email, "E-mail inválido");
      isValid = false;
    } else if (email) {
      markFieldAsValid(form.email);
    }

    if (!isValid) {
      showError("Por favor, corrija os campos destacados em vermelho.");
      return;
    }

    showSuccess("Cadastro enviado com sucesso!");
    form.reset();
    clearAllFieldStyles();
  }

  function markFieldAsInvalid(field, message) {
    field.style.border = "2px solid #dc2626";
    field.style.backgroundColor = "#fef2f2";

    let errorTooltip = field.parentNode.querySelector(".field-error");
    if (!errorTooltip) {
      errorTooltip = document.createElement("span");
      errorTooltip.className = "field-error";
      errorTooltip.style.cssText = `
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      `;
      field.parentNode.appendChild(errorTooltip);
    }
    errorTooltip.textContent = message;
  }

  function markFieldAsValid(field) {
    field.style.border = "2px solid #16a34a";
    field.style.backgroundColor = "#f0fdf4";

    const errorTooltip = field.parentNode.querySelector(".field-error");
    if (errorTooltip) {
      errorTooltip.remove();
    }
  }

  function clearAllFieldStyles() {
    const fields = form.querySelectorAll("input, select");
    fields.forEach((field) => {
      field.style.border = "";
      field.style.backgroundColor = "";

      const errorTooltip = field.parentNode.querySelector(".field-error");
      if (errorTooltip) {
        errorTooltip.remove();
      }
    });
  }

  function addInputValidationListeners(form) {
    const fields = form.querySelectorAll("input, select");

    fields.forEach((field) => {
      field.addEventListener("input", function () {
        if (this.style.border === "2px solid rgb(220, 38, 38)") {
          this.style.border = "";
          this.style.backgroundColor = "";

          const errorTooltip = this.parentNode.querySelector(".field-error");
          if (errorTooltip) {
            errorTooltip.remove();
          }
        }
      });

      field.addEventListener("change", function () {
        if (this.style.border === "2px solid rgb(220, 38, 38)") {
          this.style.border = "";
          this.style.backgroundColor = "";

          const errorTooltip = this.parentNode.querySelector(".field-error");
          if (errorTooltip) {
            errorTooltip.remove();
          }
        }
      });
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(message) {
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.style.display = "block";
    }
  }

  function showSuccess(message) {
    if (successMsg) {
      successMsg.textContent = message;
      successMsg.style.display = "block";
    }
  }
}

window.initCadastroForm = initCadastroForm;

if (document.querySelector("main.cadastro")) initCadastroForm();
