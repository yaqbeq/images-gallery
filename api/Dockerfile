FROM python:3.13
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set environment variables
# Added PYTHONUNBUFFERED=1 to ensure Python output is sent straight to terminal
ENV PYTHONUNBUFFERED=1
# Added PYTHONDONTWRITEBYTECODE=1 to prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1


# Set the working directory to /app. It is not recommended to use the root directory.
WORKDIR /app 
EXPOSE 5050

# Need to add path so the right environment is activated
ENV PATH="/app/.venv/bin:$PATH"

# Copy only dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync

# Copy the rest of the application
COPY . .

# Run the application
CMD ["python", "src/main.py"]