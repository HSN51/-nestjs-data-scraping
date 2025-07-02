
---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/nestjs-data-scraping.git
cd nestjs-data-scraping
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
npm run start
```

### 4. Check your data

Scraped data will be saved as `.json` files under `storage/YYYY-MM-DD/`.

---

## Configuration

- **Add/Edit Sources:**  
  Edit `src/fetch.sources.ts` to add new sources or update existing ones.
- **Change Fetch Interval:**  
  Adjust the cron expression in `fetch.service.ts` for custom scheduling.
- **Storage Path:**  
  All data is saved under the `storage/` directory, organized by date and source.

---

## Extending the Boilerplate

- **Add a New Source:**  
  Simply add a new entry to the `SOURCES` array in `fetch.sources.ts`.
- **Switch to Database Storage:**  
  Replace or extend `utils/file.helper.ts` with your preferred database logic.
- **Integrate with APIs:**  
  Expose scraped data via REST or GraphQL by adding controllers and DTOs.

---

## Best Practices

- **Error Logging:**  
  All fetch errors are logged with timestamps and source context.
- **No Overlapping Jobs:**  
  The scheduler will never start a new fetch cycle if the previous one is still running.
- **Rate Limiting:**  
  Built-in delay between requests to avoid hitting API rate limits.

---

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

## License

MIT

---

## Author

Hasan Hüseyin Gümüştepe
